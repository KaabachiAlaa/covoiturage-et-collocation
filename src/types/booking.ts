import type { PageQuery } from "./api"
import type { RidePreferences } from "./ride"

/** Ftareqi.Domain.Enums.BookingStatus (serialized as number) */
export enum BookingStatus {
  Pending = 0,
  CancelledByRider = 1,
  CancelledByDriver = 2,
  Accepted = 3,
  Expired = 4,
  CheckedIn = 5,
  Started = 6,
  Ended = 7,
}

/** Ftareqi.Application.QueryEnums.UpcomingTripStatusQueryEnum */
export type UpcomingBookingFilter = "Pending" | "Accepted" | "CheckedIn" | "Started"

/** Ftareqi.Application.QueryEnums.BookingStatusQueryEnum */
export type DriverRequestFilter =
  | "Pending"
  | "CancelledByRider"
  | "CancelledByDriver"
  | "Accepted"
  | "Expired"

export interface CreateBookingRequest {
  rideId: number
  numberOfSeats: number
}

export interface UserBooking extends RidePreferences {
  bookingId: number
  rideId: number
  status: BookingStatus
  bookedAt: string
  departureTime: string
  seats: number
  totalAmount: number
  driverName: string
  driverUserId: string
  startAddress: string
  endAddress: string
  driverImg?: string | null
}

export interface DriverBookingRequest {
  bookingId: number
  rideId: number
  riderUserId: string
  riderName: string
  requestedSeats: number
  totalAmount: number
  status: BookingStatus
  requestedAt: string
  departureTime: string
  startAddress: string
  endAddress: string
}

export interface UpcomingBookingsQuery extends PageQuery {
  filterBy?: UpcomingBookingFilter
}

export interface DriverRequestsQuery extends PageQuery {
  filterBy?: DriverRequestFilter
}
