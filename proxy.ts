import { NextResponse, type NextRequest } from "next/server";

const SENSITIVE_PATTERNS = [
  /\.env(\b|$)/i,
  /\.git(\b|$)/i,
  /\.gitconfig/i,
  /\.npmrc/i,
  /\.dockerignore/i,
  /\.DS_Store/i,
  /\.local$/i,
  /next\.config/i,
  /tsconfig/i,
  /proxy\.(ts|js)/i,
  /package(-lock)?\.json/i,
  /(yarn|pnpm|bun)-lock/i,
  /vercel\.json/i,
  /\.vercel/,
  /node_modules/i,
  /\.next/i,
  /\bdev-server\.log/i,
  /\.(log|bak|sql|zip|tar|gz|rar|map|pem|key|p12)$/i,
  /\.(sh|bat|cmd|ps1)$/i,
  /\.(pdf|csv|db|sqlite|sqlite3)$/i,
  /\.(ts|tsx|jsx|mjs|cjs|mts|cts)$/i,
  /\.(env|local|example|sample|template)$/i,
  /\.(swp|swo|orig|rej)$/i,
  /eslint\.config/i,
  /postcss\.config/i,
  /\.eslintrc/i,
  /\.(ya?ml|toml|ini|conf)$/i,
  /\/(app|components|lib|hooks|data|utils|server|config)\//i,
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (SENSITIVE_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse("Access denied", {
      status: 403,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)",
  ],
};