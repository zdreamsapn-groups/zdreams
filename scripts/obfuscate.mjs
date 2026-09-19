import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const JavaScriptObfuscator = require("javascript-obfuscator");

const STATIC_DIR = join(process.cwd(), ".next", "static");

const OPTIONS = {
  compact: true,
  simplify: true,
  target: "browser-no-eval",
  identifierNamesGenerator: "hexadecimal",
  renameGlobals: false,
  renameProperties: false,
  transformObjectKeys: false,
  unicodeEscapeSequence: false,
  numbersToExpressions: false,
  stringArray: true,
  stringArrayCallsTransform: false,
  stringArrayEncoding: ["base64"],
  stringArrayIndexShift: false,
  stringArrayRotate: false,
  stringArrayShuffle: false,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: false,
  stringArrayWrappersType: "variable",
  stringArrayThreshold: 0.5,
  splitStrings: false,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  selfDefending: false,
  debugProtection: false,
  disableConsoleOutput: false,
  seed: 0,
};

function collectJavaScriptFiles(dir) {
  const files = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectJavaScriptFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      files.push(fullPath);
    }
  }

  return files;
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

let files;

try {
  files = collectJavaScriptFiles(STATIC_DIR);
} catch {
  console.error(
    `[obfuscate] No build output found at ${STATIC_DIR}. Run "next build" first.`
  );
  process.exit(1);
}

if (files.length === 0) {
  console.error("[obfuscate] No JavaScript chunks found to obfuscate.");
  process.exit(1);
}

let bytesBefore = 0;
let bytesAfter = 0;
let obfuscated = 0;
const skipped = [];

for (const file of files) {
  const source = readFileSync(file, "utf8");
  bytesBefore += Buffer.byteLength(source);

  try {
    const code = JavaScriptObfuscator.obfuscate(
      source,
      OPTIONS
    ).getObfuscatedCode();

    writeFileSync(file, code, "utf8");
    bytesAfter += Buffer.byteLength(code);
    obfuscated += 1;
  } catch (error) {
    bytesAfter += Buffer.byteLength(source);
    skipped.push(`${relative(process.cwd(), file)}: ${error.message}`);
  }
}

console.log(
  `[obfuscate] Obfuscated ${obfuscated}/${files.length} chunks (${formatKb(
    bytesBefore
  )} -> ${formatKb(bytesAfter)}).`
);

if (skipped.length > 0) {
  console.warn(
    `[obfuscate] ${skipped.length} chunk(s) left un-obfuscated:\n  ${skipped.join(
      "\n  "
    )}`
  );
}
