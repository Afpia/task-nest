import { api } from '@shared/api'
import type { UserFieldResponse } from '@shared/types'

export interface UserInfoParams {
	columns: keyof UserFieldResponse
}

type GetUserInfoConfig = AxiosRequestConfig

export const getUserInfo = async ({ config }: GetUserInfoConfig) => api.get<UserFieldResponse>(`user/info`, config)
