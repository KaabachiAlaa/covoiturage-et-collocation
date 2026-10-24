/** Mirrors Ftareqi.Application.Common.ApiResponse / ApiResponse<T> */
export interface ApiEnvelope<T = undefined> {
  success: boolean
  message?: string | null
  errors?: string[] | null
  data?: T | null
}

/** Mirrors Ftareqi.Application.Common.PaginatedResponse<T> */
export interface Paginated<T> {
  items: T[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

/** Mirrors Ftareqi.Application.Common.GenericQueryReq */
export interface PageQuery {
  page?: number
  pageSize?: number
  sortDescending?: boolean
}

/** Ftareqi.Domain.Enums.Gender (serialized as number) */
export enum Gender {
  Male = 1,
  Female = 2,
}
