import type {
  LoginRequest,
  PhoneOtpRequest,
  RegisterRequest,
  ResetPasswordRequest,
  ResetTokenWithRemainingAttempts,
  Tokens,
  TokensWithRemainingAttempts,
} from "@/types/auth"
import { apiRequest } from "./api-client"
import { tokenStore } from "./token-store"

const BASE = "/api/Auth"

function storeTokens(tokens?: Tokens | null) {
  if (tokens?.refreshToken) tokenStore.setRefreshToken(tokens.refreshToken)
  if (tokens?.accessToken) tokenStore.setAccessToken(tokens.accessToken)
}

export const authService = {
  /** Creates the account and sends an SMS OTP. Returns the new user id. */
  register: (payload: RegisterRequest) =>
    apiRequest<{ id?: string }>(`${BASE}/register`, { method: "POST", body: payload, auth: false }),

  /** Login requires a confirmed phone number. */
  async login(payload: LoginRequest) {
    const tokens = await apiRequest<Tokens>(`${BASE}/login`, { method: "POST", body: payload, auth: false })
    storeTokens(tokens)
    return tokens
  },

  /** Confirms the phone with the SMS OTP and signs the user in. */
  async verifyPhone(payload: PhoneOtpRequest) {
    const result = await apiRequest<TokensWithRemainingAttempts>(`${BASE}/phone/verify`, {
      method: "POST",
      body: payload,
      auth: false,
    })
    storeTokens(result)
    return result
  },

  resendVerificationOtp: (phoneNumber: string) =>
    apiRequest(`${BASE}/phone/resend-otp`, { method: "POST", body: { phoneNumber }, auth: false }),

  requestPasswordReset: (phoneNumber: string) =>
    apiRequest(`${BASE}/password/reset/request-otp`, { method: "POST", body: { phoneNumber }, auth: false }),

  verifyResetOtp: (payload: PhoneOtpRequest) =>
    apiRequest<ResetTokenWithRemainingAttempts>(`${BASE}/password/reset/verify-otp`, {
      method: "POST",
      body: payload,
      auth: false,
    }),

  resetPassword: (payload: ResetPasswordRequest) =>
    apiRequest(`${BASE}/password/reset`, { method: "POST", body: payload, auth: false }),

  changePassword: (oldPassword: string, newPassword: string) =>
    apiRequest(`${BASE}/password/change`, { method: "POST", body: { oldPassword, newPassword } }),

  async logout() {
    const token = tokenStore.getRefreshToken()
    try {
      if (token) await apiRequest(`${BASE}/logout`, { method: "POST", body: { token } })
    } finally {
      tokenStore.clear()
    }
  },
}
