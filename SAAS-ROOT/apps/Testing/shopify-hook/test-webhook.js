import crypto from "crypto";
import { handleShopifyWebhook } from "../../../packages/core-marketplaces/shopify/src/hooks/handler.js";
// Path explanation:
// test-webhook.js
// └── apps/Testing/shopify-hook/
// ↑↑↑ go up to SAAS-ROOT
// then into packages/core-marketplaces/shopify/...


// ---- CONFIG (TEST ONLY) ----
const API_SECRET = "test_secret_key";
const SHOP = "test-shop.myshopify.com";
const TOPIC = "checkouts/create";

// ---- SAMPLE PAYLOAD ----
const payload = {
  id: 123,
  token: "abc",
  total_price: "499.00"
};

const rawBody = JSON.stringify(payload);

// ---- GENERATE VALID HMAC ----
const hmac = crypto
  .createHmac("sha256", API_SECRET)
  .update(rawBody, "utf8")
  .digest("base64");

// ---- MOCK HEADERS ----
const headers = {
  "x-shopify-hmac-sha256": hmac
};

// ---- RUN TEST ----
try {
  const event = handleShopifyWebhook({
    rawBody,
    headers,
    topic: TOPIC,
    shop: SHOP,
    apiSecret: API_SECRET
  });

  console.log("\n✅ TEST PASSED – NORMALIZED EVENT:\n");
  console.log(event);
} catch (err) {
  console.error("\n❌ TEST FAILED:\n", err.message);
}
