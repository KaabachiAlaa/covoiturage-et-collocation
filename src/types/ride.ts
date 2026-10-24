import type { Gender, PageQuery } from "./api"

/** Ftareqi.Domain.Enums.RideStatus (serialized as number) */
export enum RideStatus {
  Scheduled = 0,
  CheckedIn = 1,
  InProgress = 2,
  Completed = 3,
  Cancelled = 4,
}

/** Ftareqi.Application.QueryEnums.RideField */
export type RideSortField = "Cheapest" | "HighestRate"

export interface RidePreferences {
  musicAllowed: boolean
  noSmoking: boolean
  petsWelcomed: boolean
  openToConversation: boolean
}

export interface RideSearchCriteria {
  startLatitude?: number
  startLongitude?: number
  endLatitude?: number
  endLongitude?: number
  seats?: number
  /** ISO date-time */
  departureTime?: string
  gender?: Gender
}

export interface RideSearchQuery extends PageQuery {
  criteria?: RideSearchCriteria
  filters?: RideSortField
}

export interface RideSearchResult extends RidePreferences {
  rideId: number
  driverUserId: string
  startAddress: string
  endAddress: string
  startLatitude: number
  startLongitude: number
  endLatitude: number
  endLongitude: number
  departureTime: string
  availableSeats: number
  pricePerSeat: number
  status: RideStatus
  driverRate?: number | null
  driverName: string
  driverImgUrl: string
}

export interface CreateRideRequest {
  startLatitude: number
  startLongitude: number
  startAddress: string
  endLatitude: number
  endLongitude: number
  endAddress: string
  departureTime: string
  totalSeats: number
  pricePerSeat: number
  waitingTimeMinutes: number
  ridePreferences: RidePreferences
}

export interface DriverUpcomingRide extends RidePreferences {
  rideId: number
  startLatitude: number
  startLongitude: number
  startAddress: string
  endLatitude: number
  endLongitude: number
  endAddress: string
  totalSeats: number
  availableSeats: number
  pricePerSeat: number
  status: RideStatus
  waitingTimeMinutes: number
  departureTime: string
}

export interface DriverPastRide {
  rideId: number
  startAddress: string
  endAddress: string
  departureTime: string
  status: RideStatus
  takenSeats: number
  totalEarnings: number
  averageRating: number
}

export interface GeoLocation {
  latitude: number
  longitude: number
}
