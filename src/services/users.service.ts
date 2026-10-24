import type {
  CarForm,
  CarProfile,
  CreateReviewRequest,
  DriverProfile,
  DriverProfileForm,
  PublicDriverProfile,
  Review,
  UserProfile,
  Wallet,
} from "@/types/user"
import { apiRequest } from "./api-client"

function toFormData(values: Record<string, string | number | File>) {
  const form = new FormData()
  for (const [key, value] of Object.entries(values)) {
    form.append(key.charAt(0).toUpperCase() + key.slice(1), value instanceof File ? value : String(value))
  }
  return form
}

export const usersService = {
  getProfile: () => apiRequest<UserProfile>("/api/Profile"),

  getDriverProfile: () => apiRequest<DriverProfile>("/api/Profile/driver"),

  getCarProfile: () => apiRequest<CarProfile>("/api/Profile/driver/car"),

  getPublicDriverProfile: (userId: string) =>
    apiRequest<PublicDriverProfile>(`/api/Profile/driver/${encodeURIComponent(userId)}`),

  /** POST when the user has no photo yet, PUT to replace it. */
  uploadProfileImage: (image: File, replace: boolean) =>
    apiRequest("/api/Profile/image", { method: replace ? "PUT" : "POST", formData: toFormData({ image }) }),

  createDriverProfile: (userId: string, values: DriverProfileForm) =>
    apiRequest(`/api/users/${encodeURIComponent(userId)}/driver-profile`, {
      method: "POST",
      formData: toFormData({ ...values }),
    }),

  addCar: (userId: string, values: CarForm) =>
    apiRequest(`/api/users/${encodeURIComponent(userId)}/driver-profile/car`, {
      method: "POST",
      formData: toFormData({ ...values }),
    }),

  getWallet: () => apiRequest<Wallet>("/api/Wallet"),
}

export const reviewsService = {
  byDriver: (driverProfileId: number) => apiRequest<Review[]>(`/api/reviews/driver/${driverProfileId}`),

  byBooking: (rideBookingId: number) => apiRequest<Review>(`/api/reviews/ride-booking/${rideBookingId}`),

  create: (payload: CreateReviewRequest) => apiRequest("/api/reviews", { method: "POST", body: payload }),
}
