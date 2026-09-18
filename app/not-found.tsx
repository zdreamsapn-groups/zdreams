import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-amber-50 to-yellow-100 px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-amber-100 bg-white p-10 text-center shadow-sm">
        <p className="text-7xl font-extrabold text-amber-600">404</p>

        <h1 className="mt-4 text-xl font-extrabold tracking-tight text-gray-900">
          Page Not Found
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}