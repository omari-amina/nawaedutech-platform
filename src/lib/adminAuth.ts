// src/lib/adminAuth.ts — Lightweight admin gate (local-first, PIN)

const PIN_KEY = 'nawa_admin_pin';
const SESSION_KEY = 'nawa_admin_session';
export const DEFAULT_ADMIN_PIN = '1234';

export function getAdminPin(): string {
  try {
    return localStorage.getItem(PIN_KEY) || DEFAULT_ADMIN_PIN;
  } catch {
    return DEFAULT_ADMIN_PIN;
  }
}

export function setAdminPin(pin: string): void {
  try {
    localStorage.setItem(PIN_KEY, pin);
  } catch { /* ignore */ }
}

export function verifyAdminPin(pin: string): boolean {
  return pin === getAdminPin();
}

export function isAdminSession(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

export function openAdminSession(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch { /* ignore */ }
}

export function closeAdminSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch { /* ignore */ }
}
