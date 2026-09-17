import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center ">
      <Image
        src="/logo/logo.png"
        alt="ZDreams Logo"
        width={90}
        height={90}
        priority
      />

      <div>
        <h2 className="text-xl font-bold">
          <span className="text-amber-600">ZD</span>reams
        </h2>

        <p className="text-xs text-gray-500">
          Powered by APN Groups
        </p>
      </div>
    </Link>
  );
}