const dateFormatter = new Intl.DateTimeFormat("fr-TN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})

const timeFormatter = new Intl.DateTimeFormat("fr-TN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
})

const longDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
})

const priceFormatter = new Intl.NumberFormat("fr-TN", {
  style: "currency",
  currency: "TND",
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
})

function toDate(value: string | Date) {
  return typeof value === "string" ? new Date(value) : value
}

/** JJ/MM/AAAA */
export function formatDate(value: string | Date) {
  return dateFormatter.format(toDate(value))
}

/** HH:mm (24 h) */
export function formatTime(value: string | Date) {
  return timeFormatter.format(toDate(value))
}

export function formatLongDate(value: string | Date) {
  const text = longDateFormatter.format(toDate(value))
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function formatPrice(amount: number) {
  return priceFormatter.format(amount)
}

export function formatRating(rating?: number | null) {
  if (rating === null || rating === undefined || rating <= 0) return null
  return rating.toFixed(1).replace(".", ",")
}

export function initials(name?: string | null) {
  if (!name) return "?"
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

/** Returns YYYY-MM-DD in local time */
export function toDateInputValue(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function pluralize(count: number, singular: string, plural: string) {
  return `${count} ${count > 1 ? plural : singular}`
}
