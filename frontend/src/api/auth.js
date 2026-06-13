import { apiPost } from "./client";

export function login(username, password) {
  return apiPost("/token/", { username, password });
}
