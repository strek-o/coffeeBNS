import { apiGet, apiPost } from "./client";

export function getOrders(token) {
  return apiGet("/orders/", token);
}

export function createOrder(items, token) {
  const payload = {
    items: items.map((item) => ({
      product: item.product.id,
      quantity_kg: item.quantityKg,
    })),
  };
  return apiPost("/orders/", payload, token);
}
