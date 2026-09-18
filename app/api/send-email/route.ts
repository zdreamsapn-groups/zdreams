import { NextResponse, type NextRequest } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "zdreams.apn@gmail.com";
const SERVICE_ID = process.env.EMAILJS_SERVICE_ID ?? "service_9yqx0si";
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY ?? "2Ir1ytvXn2pVDhZcq";

const TEMPLATES: Record<string, string> = {
  quote:
    process.env.EMAILJS_TEMPLATE_ID ?? "template_a14sash",
  quoteAutoReply:
    process.env.EMAILJS_AUTO_REPLY_TEMPLATE_ID ?? "template_lbvssza",
  contact:
    process.env.EMAILJS_CONTACT_TEMPLATE_ID ??
    process.env.EMAILJS_TEMPLATE_ID ??
    "template_a14sash",
  newsletter:
    process.env.EMAILJS_NEWSLETTER_TEMPLATE_ID ??
    process.env.EMAILJS_TEMPLATE_ID ??
    "template_a14sash",
};

async function sendEmail(
  templateId: string,
  params: Record<string, unknown>
) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: templateId,
      user_id: PUBLIC_KEY,
      template_params: params,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `EmailJS request failed with status ${res.status}`);
  }
}

type RequestBody = {
  kind?: "quote" | "contact" | "newsletter";
  params?: Record<string, unknown>;
};

export async function POST(request: NextRequest) {
  let body: RequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { kind, params = {} } = body;

  if (!kind) {
    return NextResponse.json({ error: "Missing request kind." }, { status: 400 });
  }

  try {
    if (kind === "quote") {
      await sendEmail(TEMPLATES.quote, {
        ...params,
        to_email: ADMIN_EMAIL,
      });

      const autoReplyId = TEMPLATES.quoteAutoReply;
      if (autoReplyId && typeof params.email === "string") {
        await sendEmail(autoReplyId, {
          ...params,
          to_email: params.email,
          from_email: ADMIN_EMAIL,
          from_name: "ZDreams",
        });
      }
    } else if (kind === "contact") {
      await sendEmail(TEMPLATES.contact, {
        ...params,
        to_email: ADMIN_EMAIL,
      });
    } else if (kind === "newsletter") {
      await sendEmail(TEMPLATES.newsletter, {
        ...params,
        to_email: ADMIN_EMAIL,
      });
    } else {
      return NextResponse.json({ error: "Unknown request kind." }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(`EmailJS ${kind} send failed:`, error);
    return NextResponse.json(
      { error: "Message could not be sent. Please try again later." },
      { status: 500 }
    );
  }
}