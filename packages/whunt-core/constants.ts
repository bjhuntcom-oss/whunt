import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

function readVersionFile(): string {
  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const candidates = [
      resolve(__dirname, "..", "..", "VERSION"),
      resolve(process.cwd(), "VERSION"),
    ];
    for (const p of candidates) {
      if (existsSync(p)) {
        return readFileSync(p, "utf-8").trim();
      }
    }
    return "3.0.0";
  } catch {
    return "3.0.0";
  }
}

export const WHUNT_PRODUCT_NAME = "Whunt";
export const WHUNT_VERSION = readVersionFile();
export const WHUNT_WEBSITE = "https://whunt.io";
export const WHUNT_SUPPORT_EMAIL = "support@whunt.io";
export const WHUNT_SUPPORT_URL = "https://support.whunt.io";
export const WHUNT_LICENSE = "MIT";

export const WHUNT_POWERED_BY = `${WHUNT_PRODUCT_NAME} v${WHUNT_VERSION}`;
export const WHUNT_HEADER_KEY = "X-Powered-By";
export const WHUNT_HEADER_VALUE = WHUNT_POWERED_BY;

export const WHUNT_BRAND = {
  name: WHUNT_PRODUCT_NAME,
  version: WHUNT_VERSION,
  website: WHUNT_WEBSITE,
  support: WHUNT_SUPPORT_EMAIL,
  license: WHUNT_LICENSE,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Backward-compatibility aliases (deprecated — use WHUNT_* prefix)
export const DIPLOY_PRODUCT_NAME = WHUNT_PRODUCT_NAME;
export const DIPLOY_VERSION = WHUNT_VERSION;
export const DIPLOY_HEADER_KEY = WHUNT_HEADER_KEY;
export const DIPLOY_HEADER_VALUE = WHUNT_HEADER_VALUE;
export const DIPLOY_POWERED_BY = WHUNT_POWERED_BY;
export const DIPLOY_BRAND = WHUNT_BRAND;
