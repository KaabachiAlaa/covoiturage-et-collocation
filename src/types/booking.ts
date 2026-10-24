import type { Paginated, PageQuery } from "./api"

export enum BookingStatus {
  Pending = 0,
  Accepted = 1,
  Declined = 2,
  Cancelled = 3,
  Completed = 4,
}

export interface Booking {
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

export type BookingPage = Paginated<Booking>
export type BookingQuery = PageQuery & { filterBy?: number }
