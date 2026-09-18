"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Coffee, MonitorSmartphone, MailPlus } from "lucide-react";

import { pricing, DELIVERY_FEE } from "@/data/pricing";
import { countries } from "@/data/countries";
import CustomSelect from "@/components/forms/CustomSelect";
import { HONEYPOT_FIELD, isRateLimited } from "@/lib/antispam";

type FormData = {
  fullName: string;
  email: string;
  country: string;
  countryCode: string;
  phone: string;
  company: string;

  productName: string;
  eventType: string;
  eventDate: string;
  instructions: string;
  address: string;
};

const EVENT_TYPES = [
  "Wedding",
  "Birthday",
  "Baby Shower",
  "Other Event",
];

const productOptions = [
  {
    key: "Mugs",
    icon: Coffee,
    label: "Mugs",
    hint: "Personalized & custom mugs",
  },
  {
    key: "Website Design",
    icon: MonitorSmartphone,
    label: "Website Design",
    hint: "Event websites for every occasion",
  },
  {
    key: "Event Invitations",
    icon: MailPlus,
    label: "Event Invitations",
    hint: "Custom digital invitations",
  },
];

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

export default function OrderForm() {
  const [category, setCategory] = useState("Mugs");
  const [qty, setQty] = useState(1);
  const isDigital = category !== "Mugs";

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    country: "",
    countryCode: "+91",
    phone: "",
    company: "",

    productName: "",
    eventType: "",
    eventDate: "",
    instructions: "",
    address: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});

  const [honeypot, setHoneypot] = useState("");

  const unitPrice =
    pricing[category as keyof typeof pricing] || 0;

  const deliveryFee = isDigital ? 0 : DELIVERY_FEE;

  const total = useMemo(() => {
    return (unitPrice * qty + deliveryFee).toFixed(2);
  }, [qty, unitPrice, deliveryFee]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const selectCategory = (key: string) => {
    setCategory(key);
    if (key !== "Mugs") {
      setQty(1);
      setForm((prev) => ({
        ...prev,
        productName: "",
        eventType: "",
        eventDate: "",
        address: "",
      }));
    }
    setErrors({});
  };

  const countryCodes: Record<string, string> = {
    India: "+91",
    "United States": "+1",
    Canada: "+1",
    "United Kingdom": "+44",
    Australia: "+61",
    Germany: "+49",
    France: "+33",
    Italy: "+39",
    Spain: "+34",
    Japan: "+81",
    China: "+86",
    Singapore: "+65",
    Malaysia: "+60",
    UAE: "+971",
    "Saudi Arabia": "+966",
    Qatar: "+974",
    Kuwait: "+965",
    Oman: "+968",
    Bahrain: "+973",
    "Sri Lanka": "+94",
    Nepal: "+977",
    Pakistan: "+92",
    Bangladesh: "+880",
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.fullName.trim())
      newErrors.fullName = "Please enter your full name.";

    if (!form.email.trim())
      newErrors.email = "Email is required.";

    if (
      form.email &&
      !/^\S+@\S+\.\S+$/.test(form.email)
    )
      newErrors.email = "Please enter a valid email.";

    if (!form.country)
      newErrors.country = "Please select your country.";

    if (!form.phone.trim())
      newErrors.phone = "Please enter your WhatsApp number.";

    if (!form.productName.trim())
      newErrors.productName = isDigital
        ? "Please enter the website name."
        : "Product name is required.";

    if (isDigital && !form.eventType)
      newErrors.eventType = "Please select an event type.";

    if (isDigital && !form.eventDate)
      newErrors.eventDate = "Please select the event date.";

    if (!form.instructions.trim())
      newErrors.instructions = isDigital
        ? "Please describe your website requirements."
        : "Please describe your customization.";

    if (!isDigital && !form.address.trim())
      newErrors.address =
        "Please enter your delivery address.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (honeypot) {
      toast.success("Order request sent successfully!");
      return;
    }

    if (isRateLimited()) {
      toast.error("Please wait a moment before submitting again.");
      return;
    }

    if (!validate()) return;

    setLoading(true);

    try {
      const formattedFields = [
        ["Full Name", form.fullName],
        ["Email", form.email],
        ["Country", form.country],
        ["WhatsApp Number", `${form.countryCode} ${form.phone}`],
        ["Company", form.company],
        ["Category", category],
        ["Product / Website Name", form.productName],
        ["Event Type", form.eventType],
        ["Event Date", form.eventDate],
        ["Quantity", String(qty)],
        ["Estimated Unit Price", `$${unitPrice.toFixed(2)}`],
        ["Delivery Fee", `$${deliveryFee.toFixed(2)}`],
        ["Estimated Total", `$${total}`],
        ["Requirements / Customization", form.instructions],
        ["Delivery Address", form.address],
      ] as const;

      const message = `New ZDreams Order Request\n\n${formattedFields
        .filter(([, value]) => value)
        .map(([label, value]) => `${label}: ${value}`)
        .join("\n")}`;

      const templateParams: Record<string, unknown> = {
        reply_to: form.email,
        from_email: form.email,
        from_name: form.fullName || form.email,
        fullName: form.fullName,
        email: form.email,
        country: form.country,
        countryCode: form.countryCode,
        phone: `${form.countryCode} ${form.phone}`,
        company: form.company,
        category,
        productName: form.productName,
        eventType: form.eventType,
        eventDate: form.eventDate,
        quantity: String(qty),
        instructions: form.instructions,
        address: form.address,
        unitPrice: `$${unitPrice.toFixed(2)}`,
        deliveryFee: `$${deliveryFee.toFixed(2)}`,
        total: `$${total}`,
        message,
      };

      const { ok } = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "quote", params: templateParams }),
      });

      if (!ok) {
        throw new Error("Send failed");
      }

      toast.success("Order request sent successfully!");

      setForm({
        fullName: "",
        email: "",
        country: "",
        countryCode: "+91",
        phone: "",
        company: "",
        productName: "",
        eventType: "",
        eventDate: "",
        instructions: "",
        address: "",
      });

      setCategory("Mugs");
      setQty(1);

    } catch {
      toast.error(
        "Unable to send your request. Please try again or reach us directly on WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg lg:p-7"
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

      {/* ================= Customer Information ================= */}
      <section>
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
            1
          </span>
          <h2 className="text-lg font-bold text-gray-900">
            Your Details
          </h2>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">

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

          <div>
            <FieldLabel>Country</FieldLabel>
            <CustomSelect
              value={form.country}
              onChange={(value) => {
                setForm((prev) => ({
                  ...prev,
                  country: value,
                  countryCode: countryCodes[value] || "+1",
                }));
                setErrors((prev) => ({ ...prev, country: "" }));
              }}
              options={countries.map((country) => ({
                value: country,
                label: country,
              }))}
              placeholder="Select Country"
              hasError={!!errors.country}
              searchable
            />
            <FieldError message={errors.country} />
          </div>

          <div>
            <FieldLabel>WhatsApp Number</FieldLabel>
            <div className="flex overflow-hidden rounded-xl border border-gray-200 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100">
              <div className="flex items-center bg-gray-100 px-3 text-sm font-semibold text-gray-700">
                {form.countryCode}
              </div>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="flex-1 px-4 py-3 text-sm outline-none"
              />
            </div>
            <FieldError message={errors.phone} />
          </div>

          <div className="md:col-span-2">
            <FieldLabel optional>Company Name</FieldLabel>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company (Optional)"
              className={inputClass(false)}
            />
          </div>

        </div>
      </section>

      <hr className="my-6 border-gray-100" />

      {/* ================= Product Selection ================= */}
      <section>
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
            2
          </span>
          <h2 className="text-lg font-bold text-gray-900">
            Choose a Product
          </h2>
        </div>

        {/* Styled selector */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {productOptions.map((option) => {
            const Icon = option.icon;
            const active = category === option.key;

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => selectCategory(option.key)}
                className={`group flex items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-300 ${
                  active
                    ? "border-amber-600 bg-amber-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50/50"
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                    active
                      ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white"
                      : "bg-gray-100 text-amber-600 group-hover:bg-amber-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p
                    className={`font-bold ${
                      active ? "text-amber-700" : "text-gray-900"
                    }`}
                  >
                    {option.label}
                  </p>
                  <p className="text-xs text-gray-500">
                    {option.hint}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ================= Dynamic product fields ================= */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">

          {/* Name / Website name */}
          <div>
            <FieldLabel>
              {isDigital ? "Website Name" : "Product Name"}
            </FieldLabel>
            <input
              type="text"
              name="productName"
              value={form.productName}
              onChange={handleChange}
              placeholder={
                isDigital
                  ? "e.g. Priya & Arjun's Wedding"
                  : "e.g. Personalized Mug"
              }
              className={inputClass(!!errors.productName)}
            />
            <FieldError message={errors.productName} />
          </div>

          {isDigital ? (
            <>
              {/* Event Type */}
              <div>
                <FieldLabel>Event Type</FieldLabel>
                <CustomSelect
                  value={form.eventType}
                  onChange={(value) => {
                    setForm((prev) => ({ ...prev, eventType: value }));
                    setErrors((prev) => ({ ...prev, eventType: "" }));
                  }}
                  options={EVENT_TYPES.map((type) => ({
                    value: type,
                    label: type,
                  }))}
                  placeholder="Select Event Type"
                  hasError={!!errors.eventType}
                />
                <FieldError message={errors.eventType} />
              </div>

              {/* Event Date */}
              <div>
                <FieldLabel>Event Date</FieldLabel>
                <input
                  type="date"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleChange}
                  className={inputClass(!!errors.eventDate)}
                />
                <FieldError message={errors.eventDate} />
              </div>

              {/* Invoice contact (no shipping for digital) */}
              <div>
                <FieldLabel>Estimated Unit Price</FieldLabel>
                <input
                  readOnly
                  value={`$${unitPrice.toFixed(2)}`}
                  className="w-full rounded-xl border-2 border-green-100 bg-green-50 px-4 py-3 text-sm font-bold text-green-700"
                />
              </div>
            </>
          ) : (
            <>
              {/* Quantity */}
              <div>
                <FieldLabel>Quantity</FieldLabel>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, Math.min(Number(e.target.value) || 1, 10000)))
                  }
                  className={inputClass(false)}
                />
              </div>

              {/* Unit Price */}
              <div>
                <FieldLabel>Estimated Unit Price</FieldLabel>
                <input
                  readOnly
                  value={`$${unitPrice.toFixed(2)}`}
                  className="w-full rounded-xl border-2 border-green-100 bg-green-50 px-4 py-3 text-sm font-bold text-green-700"
                />
              </div>
            </>
          )}

        </div>
      </section>

      {/* Price Summary */}
      <div className="mt-5 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm">
            <p className="font-semibold">
              {category}
              {!isDigital && <span className="ml-2 text-white/70">× {qty}</span>}
            </p>
            <p className="mt-0.5 text-xs text-white/70">
              Unit price ${unitPrice.toFixed(2)}
              {!isDigital && ` + delivery $${deliveryFee.toFixed(2)}`}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
              Estimated Total
            </p>
            <p className="text-2xl font-extrabold">
              ${total}
            </p>
          </div>
        </div>

        {!isDigital && (
          <div className="mt-3 flex items-center justify-between rounded-xl bg-white/15 px-4 py-2 text-xs text-white/90">
            <span>Delivery fee ({qty > 1 ? "one order" : "one mug"})</span>
            <span className="font-bold">${deliveryFee.toFixed(2)}</span>
          </div>
        )}

        <p className="mt-3 text-xs text-white/70">
          {isDigital
            ? "Final quote depends on pages & features."
            : "Final quote may vary with customization."}
        </p>
      </div>

      <hr className="my-6 border-gray-100" />

      {/* ================= Design & Details ================= */}
      <section>
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
            3
          </span>
          <h2 className="text-lg font-bold text-gray-900">
            Design & Details
          </h2>
        </div>

        <div className="mt-5 space-y-4">

          <div>
            <FieldLabel>
              {isDigital ? "Website Requirements" : "Customization Instructions"}
            </FieldLabel>
            <textarea
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              rows={4}
              placeholder={
                isDigital
                  ? "Pages needed, colors, sections, features, references..."
                  : "Print my name and logo on the mug..."
              }
              className={`${inputClass(!!errors.instructions)} leading-6`}
            />
            <FieldError message={errors.instructions} />
          </div>

          {/* Delivery address — physical only */}
          {!isDigital ? (
            <div>
              <FieldLabel>Delivery Address</FieldLabel>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                placeholder="House / Flat, Street, City, State, ZIP, Country"
                className={`${inputClass(!!errors.address)} leading-6`}
              />
              <FieldError message={errors.address} />
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-violet-50/60 px-5 py-4 text-sm text-violet-700">
              <MonitorSmartphone className="h-5 w-5 shrink-0" />
              Your website is delivered digitally — no shipping address needed.
            </div>
          )}

        </div>
      </section>

      {/* ================= Terms & Submit ================= */}
      <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-amber-100 bg-amber-50/60 px-5 py-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 accent-amber-600"
          />
          <span className="text-xs leading-5 text-gray-600">
            I confirm the details above are correct. ZDreams may contact me
            by email or WhatsApp regarding this request. Prices shown are
            estimates and the final quote may vary.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading
          ? "Sending Request..."
          : isDigital
            ? "Request Website Quote"
            : "Request Free Quote"}
      </button>

    </form>
  );
}