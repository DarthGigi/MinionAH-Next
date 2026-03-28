import { UseSend } from "usesend-js";
import { env } from "~/env";

if (!env.USESEND_API_KEY) {
  throw new Error("USESEND_API_KEY is not set");
}

if (!env.USESEND_BASE_URL) {
  throw new Error("USESEND_BASE_URL is not set");
}

export const usesend = new UseSend(env.USESEND_API_KEY, env.USESEND_BASE_URL);
