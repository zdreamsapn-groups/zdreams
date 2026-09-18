"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { HONEYPOT_FIELD, isRateLimited } from "@/lib/antispam";

type ContactFormData = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 ${
    hasError
      ? "border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
  }`;

function FieldLabel({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
      {children}
      {!optional && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-500">{message}</p>;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      toast.success("Message sent successfully! We'll reply within 24 hours.");
      return;
    }

    if (isRateLimited()) {
      toast.error(
        "Please wait a moment before sending another message."
      );
      return;
    }

    const nextErrors: Partial<Record<keyof ContactFormData, string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    if (!form.email.trim()) nextErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "Please enter a valid email address.";
    if (!form.subject.trim()) nextErrors.subject = "Please add a subject.";
    if (!form.message.trim()) nextErrors.message = "Please write a message.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);

    const message = `New Contact Message from ${form.fullName}\n\nMessage:\n${form.message}`;

    try {
      const { ok } = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          params: {
            from_email: form.email,
            from_name: form.fullName || form.email,
            reply_to: form.email,
            fullName: form.fullName,
            email: form.email,
            subject: form.subject,
            message,
          },
        }),
      });

      if (!ok) {
        throw new Error("Send failed");
      }

      toast.success("Message sent successfully! We'll reply within 24 hours.");

      setForm({ fullName: "", email: "", subject: "", message: "" });
    } catch {
      toast.error(
        "Failed to send your message. Please try again or reach us directly on WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-4 md:grid-cols-2"
    >
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD}>Website</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <FieldLabel>Full Name</FieldLabel>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="John Smith"
          className={inputClass(!!errors.fullName)}
        />
        <FieldError message={errors.fullName} />
      </div>

      <div>
        <FieldLabel>Email Address</FieldLabel>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={inputClass(!!errors.email)}
        />
        <FieldError message={errors.email} />
      </div>

      <div className="md:col-span-2">
        <FieldLabel>Subject</FieldLabel>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="How can we help?"
          className={inputClass(!!errors.subject)}
        />
        <FieldError message={errors.subject} />
      </div>

      <div className="md:col-span-2">
        <FieldLabel>Message</FieldLabel>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your custom gift, bulk order or any other inquiry..."
          rows={5}
          className={`${inputClass(!!errors.message)} resize-none`}
        />
        <FieldError message={errors.message} />
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </button>
      </div>
    </form>
  );
}