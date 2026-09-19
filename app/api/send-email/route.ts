import { NextResponse, type NextRequest } from "next/server";

import {
  getClientIp,
  hasAcceptableBodySize,
  isServerRateLimited,
  isTrustedRequest,
  isValidEmail,
  sanitizeParams,
} from "@/lib/server-security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";
const SERVICE_ID = process.env.EMAILJS_SERVICE_ID ?? "";
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY ?? "";
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY ?? "";

const TEMPLATES = {
  quote: process.env.EMAILJS_TEMPLATE_ID ?? "",
  quoteAutoReply: process.env.EMAILJS_AUTO_REPLY_TEMPLATE_ID ?? "",
  contact:
    process.env.EMAILJS_CONTACT_TEMPLATE_ID ??
    process.env.EMAILJS_TEMPLATE_ID ??
    "",
  newsletter:
    process.env.EMAILJS_NEWSLETTER_TEMPLATE_ID ??
    process.env.EMAILJS_TEMPLATE_ID ??
    "",
} as const;

const NO_STORE = { "Cache-Control": "no-store, max-age=0" };

type RequestKind = keyof typeof TEMPLATES;

const KINDS: RequestKind[] = ["quote", "contact", "newsletter"];

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: NO_STORE });
}

function isConfigured() {
  return Boolean(ADMIN_EMAIL && SERVICE_ID && PUBLIC_KEY);
}

async function sendEmail(
  templateId: string,
  params: Record<string, string>
) {
  if (!templateId) {
    throw new Error("Missing EmailJS template id.");
  }

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: templateId,
      user_id: PUBLIC_KEY,
      ...(PRIVATE_KEY ? { accessToken: PRIVATE_KEY } : {}),
      template_params: params,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `EmailJS request failed with status ${res.status}`);
  }
}

export async function POST(request: NextRequest) {
  if (!isTrustedRequest(request)) {
    return jsonError("Forbidden.", 403);
  }

  if (!hasAcceptableBodySize(request)) {
    return jsonError("Payload too large.", 413);
  }

  if (isServerRateLimited(getClientIp(request))) {
    return jsonError("Too many requests. Please try again later.", 429);
  }

  if (!isConfigured()) {
    return jsonError("Email service is not configured.", 500);
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  if (typeof body !== "object" || body === null) {
    return jsonError("Invalid request body.", 400);
  }

  const { kind, params: rawParams } = body as {
    kind?: unknown;
    params?: unknown;
  };

  if (typeof kind !== "string" || !KINDS.includes(kind as RequestKind)) {
    return jsonError("Unknown request kind.", 400);
  }

  const params = sanitizeParams(rawParams);
  if (!params) {
    return jsonError("Invalid request payload.", 400);
  }

  const email = params.email || params.reply_to || params.from_email || "";

  if (!isValidEmail(email)) {
    return jsonError("A valid email address is required.", 400);
  }

  const requestKind = kind as RequestKind;

  if (requestKind === "contact" && !params.message) {
    return jsonError("Message is required.", 400);
  }

  try {
    if (requestKind === "quote") {
      await sendEmail(TEMPLATES.quote, {
        ...params,
        to_email: ADMIN_EMAIL,
      });

      if (TEMPLATES.quoteAutoReply) {
        await sendEmail(TEMPLATES.quoteAutoReply, {
          ...params,
          to_email: email,
          from_email: ADMIN_EMAIL,
          from_name: "ZDreams",
        });
      }
    } else {
      await sendEmail(TEMPLATES[requestKind], {
        ...params,
        to_email: ADMIN_EMAIL,
      });
    }

    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (error) {
    console.error(`EmailJS ${requestKind} send failed:`, error);
    return jsonError(
      "Message could not be sent. Please try again later.",
      500
    );
  }
}
