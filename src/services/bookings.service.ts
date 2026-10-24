import type { Paginated, PageQuery } from "@/types/api"
import type {
  CreateBookingRequest,
  DriverBookingRequest,
  DriverRequestsQuery,
  UpcomingBookingsQuery,
  UserBooking,
} from "@/types/booking"
import { apiRequest } from "./api-client"

const BASE = "/api/ride-bookings"

export const bookingsService = {
  /** Creates a Pending booking; the backend locks the amount in the rider's wallet. */
  create: (payload: CreateBookingRequest) => apiRequest(BASE, { method: "POST", body: payload }),

  getById: (bookingId: number) => apiRequest<UserBooking>(`${BASE}/${bookingId}`),

  userUpcoming: (query: UpcomingBookingsQuery = {}) =>
    apiRequest<Paginated<UserBooking>>(`${BASE}/user/upcoming`, { query: { ...query } }),

  userHistory: (query: PageQuery = {}) =>
    apiRequest<Paginated<UserBooking>>(`${BASE}/user/history`, { query: { ...query } }),

  cancelByRider: (bookingId: number) => apiRequest(`${BASE}/${bookingId}/cancel`, { method: "POST" }),

  driverRequests: (query: DriverRequestsQuery = {}) =>
    apiRequest<Paginated<DriverBookingRequest>>(`${BASE}/driver/requests`, { query: { ...query } }),

  accept: (bookingId: number) => apiRequest(`${BASE}/${bookingId}/accept`, { method: "POST" }),

  decline: (bookingId: number) => apiRequest(`${BASE}/${bookingId}/decline`, { method: "POST" }),
}
