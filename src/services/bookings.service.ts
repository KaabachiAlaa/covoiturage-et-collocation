import { apiRequest, type QueryParams } from "./api-client"
import type { BookingPage, BookingQuery } from "@/types/booking"

export function getUpcomingBookings(query: BookingQuery = {}, signal?: AbortSignal) {
  return apiRequest<BookingPage>("/api/ride-bookings/user/upcoming", {
    query: query as QueryParams,
    signal,
  })
}

export function getBookingHistory(query: BookingQuery = {}, signal?: AbortSignal) {
  return apiRequest<BookingPage>("/api/ride-bookings/user/history", {
    query: query as QueryParams,
    signal,
  })
}

export function cancelBooking(bookingId: number) {
  return apiRequest(`/api/ride-bookings/${bookingId}/cancel`, { method: "POST" })
}
