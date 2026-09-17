"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type OptionValue = string;

type Option = OptionValue | { value: OptionValue; label: string };

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  hasError?: boolean;
  searchable?: boolean;
};

const toOption = (option: Option) =>
  typeof option === "string"
    ? { value: option, label: option }
    : option;

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  hasError,
  searchable = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const list = options.map(toOption);

  const filtered = searchable
    ? list.filter((o) =>
        o.label.toLowerCase().includes(query.toLowerCase())
      )
    : list;

  const selected = list.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt: { value: string; label: string }) => {
    onChange(opt.value);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-all duration-300 ${
          hasError
            ? "border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 hover:border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
        } ${open ? "border-amber-500 ring-2 ring-amber-100" : ""}`}
      >
        <span
          className={`truncate ${
            selected ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-300 ${
            open ? "rotate-180 text-amber-600" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60">
          {searchable && (
            <div className="border-b border-gray-100 p-2">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-100"
              />
            </div>
          )}

          <ul className="max-h-56 overflow-y-auto p-1.5">
            {filtered.length === 0 && (
              <li className="px-3 py-2.5 text-sm text-gray-400">
                No results found.
              </li>
            )}

            {filtered.map((opt) => {
              const active = opt.value === value;

              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-150 ${
                      active
                        ? "bg-amber-100 font-semibold text-amber-700"
                        : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                  >
                    {opt.label}
                    {active && (
                      <Check className="h-4 w-4 text-amber-600" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}