export const HONEYPOT_FIELD = "website";
export const SUBMIT_COOLDOWN_MS = 30000;
const RATE_KEY = "zdreams:lastSubmit";

export function isRateLimited(): boolean {
  if (typeof window === "undefined") return false;

  const now = Date.now();
  const last = Number(sessionStorage.getItem(RATE_KEY) || 0);

  if (last && now - last < SUBMIT_COOLDOWN_MS) return true;

  sessionStorage.setItem(RATE_KEY, String(now));
  return false;
}