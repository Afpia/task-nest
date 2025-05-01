import { api } from '@shared/api'
import type { GetUserInfoConfig, PatchUserInfoConfig, UserFieldResponse } from '@shared/types'

export const getUserInfo = async ({ config }: GetUserInfoConfig) => api.get<UserFieldResponse>(`user/info`, config)

export const patchUserInfo = async ({ config, data }: PatchUserInfoConfig) =>
	api.patch<UserFieldResponse>(`user/info`, data, config)
