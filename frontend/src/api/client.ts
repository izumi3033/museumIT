// src/api/client.ts
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const BASE_URL =
  (import.meta.env.VITE_API_BASE ?? "").toString().replace(/\/+$/, "");

export class ApiError extends Error {
  method: HttpMethod;
  path: string;
  status: number;
  detail?: unknown;

  constructor(method: HttpMethod, path: string, status: number, detail?: unknown) {
    super(`${method} ${path} -> ${status}`);
    this.method = method;
    this.path = path;
    this.status = status;
    this.detail = detail;
  }
}

async function request<T, B = unknown>(
  method: HttpMethod,
  path: string,
  body?: B,
  init?: RequestInit
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const headers = new Headers(init?.headers);
  if (body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(url, {
    ...init,
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let detail: unknown;
    try {
      const ct = res.headers.get("content-type") ?? "";
      if (ct.includes("application/json")) {
        detail = (await res.json()) as unknown;
      } else {
        detail = await res.text();
      }
    } catch {
      // ignore
    }
    throw new ApiError(method, path, res.status, detail);
  }

  // レスポンスは常に JSON を想定
  const data = (await res.json()) as unknown as T;
  return data;
}

export const apiGet = <T>(path: string, init?: RequestInit) =>
  request<T, never>("GET", path, undefined, init);

export const apiPost = <T, B = unknown>(path: string, body?: B, init?: RequestInit) =>
  request<T, B>("POST", path, body, init);
