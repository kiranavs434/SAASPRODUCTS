// Why: single entry point for Shopify webhook handling (MEP)

import { verifyShopifyWebhook } from "./verifyWebhook.js";
import { normalizeShopifyEvent } from "./normalizeEvent.js";

export function handleShopifyWebhook({
  rawBody,
  headers,
  topic,
  shop,
  apiSecret
}) {
  console.log("[SHOPIFY-HOOK] handleShopifyWebhook start");

  const hmacHeader =
    headers["x-shopify-hmac-sha256"] ||
    headers["X-Shopify-Hmac-Sha256"];

  const verified = verifyShopifyWebhook({
    rawBody,
    hmacHeader,
    apiSecret
  });

  if (!verified) {
    throw new Error("SHOPIFY_WEBHOOK_VERIFICATION_FAILED");
  }

  const payload = JSON.parse(rawBody);

  return normalizeShopifyEvent({
    topic,
    shop,
    payload
  });
}
