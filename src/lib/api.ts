// src/lib/api.ts — couche API front (SDD US-2)
// Backend optionnel (VITE_API_URL); fallback local si offline.

const API_BASE =
  (import.meta as any).env?.VITE_API_URL?.replace(/\/$/, '') ||
  'http://localhost:5000';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function req<T>(path: string, init?: RequestInit, timeoutMs = 25000): Promise<T> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: ctrl.signal,
      ...init,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new ApiError(res.status, (data as any)?.error || `HTTP ${res.status}`);
    return data as T;
  } finally {
    clearTimeout(t);
  }
}

export interface ApiProduct {
  id: string; name: string; nameAr: string; price: number; currency: string; stock: number; type: string;
}
export interface ApiCourse {
  id: string; title: string; titleAr: string; duration: string; level: string; price: number;
}
export interface ApiOrder {
  id: string; status: string; total: number; subtotal: number; createdAt: string;
  [k: string]: unknown;
}

export const apiBase = () => API_BASE;
export const checkHealth = () => req<{ status: string }>('/api/health');
export const getProducts = () => req<ApiProduct[]>('/api/products');
export const getCourses = () => req<ApiCourse[]>('/api/courses');
export const getOrder = (id: string) => req<ApiOrder>(`/api/orders/${encodeURIComponent(id)}`);

export async function createOrder(payload: Record<string, unknown>): Promise<ApiOrder> {
  return req<ApiOrder>('/api/orders', { method: 'POST', body: JSON.stringify(payload) });
}

export async function createContact(payload: {
  name: string; email: string; subject: string; message: string;
}): Promise<{ ok: boolean; id: string }> {
  return req('/api/contact', { method: 'POST', body: JSON.stringify(payload) });
}

// Hook util: tente le backend, sinon exécute le fallback local.
export async function withFallback<T>(
  fn: () => Promise<T>,
  fallback: () => T | Promise<T>,
): Promise<{ data: T; online: boolean }> {
  try {
    return { data: await fn(), online: true };
  } catch {
    return { data: await fallback(), online: false };
  }
}
