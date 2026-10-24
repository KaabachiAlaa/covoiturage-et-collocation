import type { Gender } from "./api"

/** Ftareqi.Domain.Enums.DriverStatus — values not exposed with labels in DTOs, kept numeric */
export type DriverStatus = number

export interface UserProfile {
  id?: string | null
  fullName?: string | null
  gender: Gender
  createdAt: string
  userImage?: string | null
  phoneNumber?: string | null
  isDriver: boolean
  phoneNumberConfirmed: boolean
  driverId?: number | null
  tripsTakenCount: number
}

export interface DriverProfile {
  id: number
  licenseExpiryDate: string
  status: DriverStatus
  createdAt: string
  driverProfilePhoto?: string | null
  driverLicenseFront?: string | null
  driverLicenseBack?: string | null
  tripsOfferedCount?: number | null
  rating?: number | null
}

export interface CarProfile {
  id: number
  model: string
  color: string
  plate: string
  numOfSeats: number
  licenseExpiryDate: string
  createdAt: string
  carPhoto?: string | null
  carLicenseFront?: string | null
  carLicenseBack?: string | null
}

export interface PublicDriverProfile {
  name?: string | null
  gender: Gender
  joinedAt?: string | null
  driverImg?: string | null
  rating?: number | null
  tripsTaken: number
  carImg?: string | null
  carModel?: string | null
  carPlate?: string | null
}

export interface Review {
  id: number
  textReview?: string | null
  stars: number
  createdAt: string
  updatedAt: string
}

export interface CreateReviewRequest {
  rideBookingId: number
  textReview?: string
  stars: number
}

export interface Wallet {
  id: number
  balance: number
  lockedBalance: number
  isLocked: boolean
  createdAt: string
  updatedAt?: string | null
}

export interface DriverProfileForm {
  driverProfilePhoto: File
  driverLicenseFront: File
  driverLicenseBack: File
  licenseExpiryDate: string
}

export interface CarForm {
  model: string
  color: string
  plate: string
  licenseExpiryDate: string
  numOfSeats: number
  carPhoto: File
  carLicenseFront: File
  carLicenseBack: File
}
