import type { Paginated, PageQuery } from "@/types/api"
import type {
  CreateRideRequest,
  DriverPastRide,
  DriverUpcomingRide,
  GeoLocation,
  RideSearchQuery,
  RideSearchResult,
} from "@/types/ride"
import { apiRequest } from "./api-client"

const BASE = "/api/rides"

export const ridesService = {
  /** GET /api/rides/search — requires authentication on the backend. */
  search: ({ criteria, ...rest }: RideSearchQuery) =>
    apiRequest<Paginated<RideSearchResult>>(`${BASE}/search`, {
      query: { ...rest, criteria: criteria ? { ...criteria } : undefined },
    }),

  /** POST /api/rides — DriverOnly policy. */
  create: (payload: CreateRideRequest) => apiRequest(BASE, { method: "POST", body: payload }),

  driverUpcoming: (query: PageQuery = {}) =>
    apiRequest<Paginated<DriverUpcomingRide>>(`${BASE}/driver/upcoming`, { query: { ...query } }),

  driverPast: (query: PageQuery = {}) =>
    apiRequest<Paginated<DriverPastRide>>(`${BASE}/driver/past`, { query: { ...query } }),

  cancel: (rideId: number) => apiRequest(`${BASE}/${rideId}/cancel`, { method: "POST" }),

  checkIn: (rideId: number, location: GeoLocation) =>
    apiRequest(`${BASE}/${rideId}/check-in`, { method: "POST", body: location }),

  start: (rideId: number, location: GeoLocation) =>
    apiRequest(`${BASE}/${rideId}/start`, { method: "POST", body: location }),

  end: (rideId: number, location: GeoLocation) =>
    apiRequest(`${BASE}/${rideId}/end`, { method: "POST", body: location }),
}
