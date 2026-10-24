import type { Gender } from "./api"

export interface RegisterRequest {
  fullName: string
  phoneNumber: string
  password: string
  gender: Gender
  /** ISO date */
  dateOfBirth: string
}

export interface LoginRequest {
  phoneNumber: string
  password: string
}

export interface Tokens {
  accessToken?: string | null
  refreshToken?: string | null
}

export interface TokensWithRemainingAttempts extends Tokens {
  remainingAttempts?: number | null
}

export interface ResetTokenWithRemainingAttempts {
  remainingAttempts?: number | null
  resetToken?: string | null
}

export interface PhoneOtpRequest {
  phoneNumber: string
  otp: string
}

export interface ResetPasswordRequest {
  phoneNumber: string
  resetToken: string
  password: string
}

export interface SessionClaims {
  userId: string
  isDriver: boolean
  roles: string[]
  expiresAt: number
}
