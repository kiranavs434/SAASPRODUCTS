// Why: verify Shopify webhook authenticity (reusable everywhere)

import crypto from "crypto";

export function verifyShopifyWebhook({
  rawBody,
  hmacHeader,
  apiSecret
}) {
  console.log("[SHOPIFY-HOOK] verifyShopifyWebhook called");

  if (!hmacHeader) {
    console.log("[SHOPIFY-HOOK] Missing HMAC header");
    return false;
  }

  const digest = crypto
    .createHmac("sha256", apiSecret)
    .update(rawBody, "utf8")
    .digest("base64");

  const isValid = crypto.timingSafeEqual(
    Buffer.from(digest),
    Buffer.from(hmacHeader)
  );

  console.log("[SHOPIFY-HOOK] HMAC valid:", isValid);
  return isValid;
}
