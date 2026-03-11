// Why: convert Shopify-specific webhook payloads into internal neutral events

export function normalizeShopifyEvent({
  topic,
  shop,
  payload
}) {
  console.log("[SHOPIFY-HOOK] normalizeShopifyEvent", topic);

  return {
    source: "shopify",          // Why: identify event origin
    topic,                      // Original Shopify topic
    shop,                       // myshopify domain
    timestamp: Date.now(),      // When we received it
    payload                     // Raw payload (apps decide what to read)
  };
}
