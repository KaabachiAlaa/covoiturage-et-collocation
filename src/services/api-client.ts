import { API_URL, isApiConfigured } from "@/lib/config"
import type { ApiEnvelope } from "@/types/api"
import { tokenStore } from "./token-store"

export class ApiError extends Error {
  status: number
  serverMessage?: string
  details: string[]

  constructor(message: string, status: number, serverMessage?: string, details: string[] = []) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.serverMessage = serverMessage
    this.details = details
  }
}

const STATUS_MESSAGES: Record<number, string> = {
  0: "Impossible de joindre le serveur. Vérifiez votre connexion ou l'adresse de l'API.",
  400: "La requête est invalide. Vérifiez les informations saisies.",
  401: "Votre session a expiré. Veuillez vous reconnecter.",
  403: "Vous n'avez pas l'autorisation d'effectuer cette action.",
  404: "La ressource demandée est introuvable.",
  409: "Cette action entre en conflit avec l'état actuel des données.",
  422: "Les données envoyées ne sont pas valides.",
  429: "Trop de tentatives. Patientez quelques instants avant de réessayer.",
  500: "Une erreur interne est survenue côté serveur.",
  503: "Le service est momentanément indisponible.",
}

function messageForStatus(status: number) {
  return STATUS_MESSAGES[status] ?? (status >= 500 ? STATUS_MESSAGES[500] : "Une erreur inattendue est survenue.")
}

export function getErrorMessage(error: unknown) {
  if (error instanceof ApiError) return error.message
  if (error instanceof Error) return error.message
  return "Une erreur inattendue est survenue."
}

export function getErrorDetail(error: unknown) {
  if (!(error instanceof ApiError)) return undefined
  const parts = [error.serverMessage, ...error.details].filter(Boolean)
  return parts.length ? parts.join(" — ") : undefined
}

type QueryValue = string | number | boolean | null | undefined
export type QueryParams = Record<string, QueryValue | Record<string, QueryValue>>

/**
 * Serializes nested objects as ASP.NET Core model-binding keys,
 * e.g. { criteria: { seats: 2 } } -> Criteria.Seats=2
 */
function buildQuery(params?: QueryParams) {
  if (!params) return ""
  const search = new URLSearchParams()
  const cap = (key: string) => key.charAt(0).toUpperCase() + key.slice(1)
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue
    if (typeof value === "object") {
      for (const [subKey, subValue] of Object.entries(value)) {
        if (subValue === undefined || subValue === null || subValue === "") continue
        search.append(`${cap(key)}.${cap(subKey)}`, String(subValue))
      }
    } else {
      search.append(cap(key), String(value))
    }
  }
  const query = search.toString()
  return query ? `?${query}` : ""
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: unknown
  formData?: FormData
  query?: QueryParams
  auth?: boolean
  signal?: AbortSignal
}

let refreshPromise: Promise<string | null> | null = null

/** POST /api/Auth/token/refresh — body { token }, returns the new access token as data */
export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = tokenStore.getRefreshToken()
  if (!refreshToken || !isApiConfigured) return null
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const response = await fetch(`${API_URL}/api/Auth/token/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ token: refreshToken }),
        })
        if (!response.ok) {
          if (response.status === 400 || response.status === 401) tokenStore.clear()
          return null
        }
        const json = (await response.json()) as ApiEnvelope<string>
        const token = json.data ?? null
        tokenStore.setAccessToken(token)
        return token
      } catch {
        return null
      } finally {
        refreshPromise = null
      }
    })()
  }
  return refreshPromise
}

async function parseError(response: Response): Promise<ApiError> {
  let serverMessage: string | undefined
  let details: string[] = []
  try {
    const json = (await response.json()) as ApiEnvelope<unknown> & {
      title?: string
      errors?: string[] | Record<string, string[]>
    }
    serverMessage = json.message ?? json.title ?? undefined
    if (Array.isArray(json.errors)) details = json.errors
    else if (json.errors && typeof json.errors === "object") details = Object.values(json.errors).flat()
  } catch {
    // body is not JSON
  }
  return new ApiError(messageForStatus(response.status), response.status, serverMessage, details)
}

export async function apiRequest<T = undefined>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!isApiConfigured) {
    throw new ApiError(
      "L'API n'est pas configurée. Définissez la variable NEXT_PUBLIC_API_URL pour connecter le backend.",
      0,
    )
  }

  const { method = "GET", body, formData, query, auth = true, signal } = options
  const url = `${API_URL}${path}${buildQuery(query)}`

  const send = async (token: string | null) => {
    const headers: Record<string, string> = { Accept: "application/json" }
    if (body !== undefined) headers["Content-Type"] = "application/json"
    if (auth && token) headers.Authorization = `Bearer ${token}`
    return fetch(url, {
      method,
      headers,
      body: formData ?? (body !== undefined ? JSON.stringify(body) : undefined),
      signal,
    })
  }

  let response: Response
  try {
    let token = auth ? tokenStore.getAccessToken() : null
    if (auth && !token) token = await refreshAccessToken()
    response = await send(token)
    if (auth && response.status === 401) {
      const refreshed = await refreshAccessToken()
      if (refreshed) response = await send(refreshed)
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error
    throw new ApiError(messageForStatus(0), 0)
  }

  if (!response.ok) throw await parseError(response)
  if (response.status === 204) return undefined as T

  const json = (await response.json().catch(() => null)) as ApiEnvelope<T> | null
  if (json && json.success === false) {
    throw new ApiError("L'opération n'a pas pu être effectuée.", response.status, json.message ?? undefined, json.errors ?? [])
  }
  return (json?.data ?? undefined) as T
}

/** Builds an absolute URL for images returned by the backend (may be relative paths). */
export function resolveMediaUrl(path?: string | null) {
  if (!path) return undefined
  if (/^https?:\/\//.test(path)) return path
  return `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`
}
