import { apiGet } from "./client";

export function getProducts() {
  return apiGet("/products/");
}
