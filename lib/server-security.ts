import { type NextRequest } from "next/server";

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_FIELDS = 40;
const MAX_FIELD_LENGTH = 4000;
const MAX_BODY_BYTES = 20 * 1024;
const FIELD_KEY_PATTERN = /^[a-zA-Z0-9_]{1,64}$/;
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

type RateBucket = { count: number; resetAt: number };

const buckets = new Map<string, RateBucket>();

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "0.0.0.0"
  );
}

export function isServerRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (buckets.size > 10_000) {
    for (const [bucketKey, value] of buckets) {
      if (now > value.resetAt) buckets.delete(bucketKey);
    }
  }

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > MAX_REQUESTS_PER_WINDOW;
}

export function isTrustedRequest(request: NextRequest): boolean {
  const host = request.headers.get("host");
  if (!host) return false;

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }

  return fetchSite === "same-origin" || fetchSite === "same-site";
}

export function hasAcceptableBodySize(request: NextRequest): boolean {
  const header = request.headers.get("content-length");
  if (!header) return true;

  const size = Number(header);
  return Number.isFinite(size) && size <= MAX_BODY_BYTES;
}

export function sanitizeParams(
  input: unknown
): Record<string, string> | null {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return null;
  }

  const entries = Object.entries(input as Record<string, unknown>);
  if (entries.length > MAX_FIELDS) return null;

  const clean: Record<string, string> = {};

  for (const [key, value] of entries) {
    if (!FIELD_KEY_PATTERN.test(key)) continue;
    if (value === null || value === undefined) continue;
    if (
      typeof value !== "string" &&
      typeof value !== "number" &&
      typeof value !== "boolean"
    ) {
      continue;
    }

    clean[key] = String(value)
      .replace(CONTROL_CHARS, "")
      .slice(0, MAX_FIELD_LENGTH);
  }

  return clean;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 254;
}
