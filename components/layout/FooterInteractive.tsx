"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send, ArrowUp, Loader2 } from "lucide-react";
import { HONEYPOT_FIELD, isRateLimited } from "@/lib/antispam";

type NewsletterFormData = {
  email: string;
  honeypot: string;
};

export function NewsletterForm() {
  const [form, setForm] = useState<NewsletterFormData>({ email: "", honeypot: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.honeypot) {
      toast.success("Subscribed! Welcome to ZDreams.");
      return;
    }

    if (isRateLimited()) {
      toast.error("Please wait a moment before subscribing again.");
      return;
    }

    const email = form.email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const { ok } = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "newsletter",
          params: {
            from_email: email,
            from_name: "Newsletter Subscriber",
            reply_to: email,
            fullName: "Newsletter Subscriber",
            email,
            subject: "New Newsletter Subscription",
            message: `New ZDreams newsletter subscription from ${email}`,
          },
        }),
      });

      if (!ok) {
        throw new Error("Send failed");
      }

      toast.success("Subscribed! Welcome to ZDreams.");
      setForm({ email: "", honeypot: "" });
    } catch {
      toast.error(
        "Subscription failed. Please try again or email us at zdreams.apn@gmail.com."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 flex overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-amber-100"
    >
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Your email address"
        autoComplete="email"
        className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
      />
      <input
        type="text"
        name={HONEYPOT_FIELD}
        value={form.honeypot}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px"
      />
      <button
        type="submit"
        disabled={loading}
        aria-label="Subscribe to newsletter"
        className="bg-gradient-to-r from-amber-600 to-yellow-500 px-4 text-white transition hover:from-amber-700 hover:to-yellow-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
      </button>
    </form>
  );
}

export function BackToTop() {
  return (
    <button
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      Back to Top
      <ArrowUp className="h-3.5 w-3.5" />
    </button>
  );
}