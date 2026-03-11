// Why: canonical list of Shopify webhook topics we care about (MEP only)

export const SHOPIFY_EVENTS = {
  APP_UNINSTALLED: "app/uninstalled",
  CHECKOUT_CREATE: "checkouts/create",
  CHECKOUT_UPDATE: "checkouts/update",
  ORDER_CREATE: "orders/create"
};
