import type { SessionClaims } from "@/types/auth"

/**
 * Auth strategy (matches the ASP.NET backend, which returns JWTs in the JSON body):
 * - The short-lived access token (30 min) lives in memory only.
 * - The refresh token is persisted so the session survives reloads.
 * - Passwords are never stored anywhere.
 * For stronger XSS protection, move the refresh token to an httpOnly cookie
 * once the backend can set it.
 */
const REFRESH_KEY = "cc.refresh-token"

let accessToken: string | null = null
const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

export const tokenStore = {
  getAccessToken: () => accessToken,
  setAccessToken(token: string | null) {
    accessToken = token
    notify()
  },
  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null
    return window.localStorage.getItem(REFRESH_KEY)
  },
  setRefreshToken(token: string | null) {
    if (typeof window === "undefined") return
    if (token) window.localStorage.setItem(REFRESH_KEY, token)
    else window.localStorage.removeItem(REFRESH_KEY)
  },
  clear() {
    accessToken = null
    if (typeof window !== "undefined") window.localStorage.removeItem(REFRESH_KEY)
    notify()
  },
  subscribe(listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
}

const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
const NAME_ID_CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"

export function decodeClaims(token: string | null): SessionClaims | null {
  if (!token) return null
  try {
    const payload = token.split(".")[1]
    const json = decodeURIComponent(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
        .split("")
        .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
        .join(""),
    )
    const data = JSON.parse(json) as Record<string, unknown>
    const rawRoles = data[ROLE_CLAIM] ?? data.role ?? []
    return {
      userId: String(data.sub ?? data[NAME_ID_CLAIM] ?? ""),
      isDriver: String(data.IsDriver ?? "").toLowerCase() === "true",
      roles: Array.isArray(rawRoles) ? rawRoles.map(String) : [String(rawRoles)],
      expiresAt: typeof data.exp === "number" ? data.exp * 1000 : 0,
    }
  } catch {
    return null
  }
}
