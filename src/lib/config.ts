export const APP_NAME = "Covoiturage et Colocation"

export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "")

export const isApiConfigured = API_URL.length > 0

export const PHONE_PREFIX = "+216"
