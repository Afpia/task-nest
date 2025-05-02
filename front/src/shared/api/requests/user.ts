import { api } from '@shared/api'
import type { GetUserInfoConfig, PatchUserInfoConfig, UserFieldResponse } from '@shared/types'

export const getUserInfo = async ({ config }: GetUserInfoConfig) => api.get<UserFieldResponse>(`user/info`, config)

// NOTE: Сделано post для аватарок, иначе не работает обновление аватарки
export const patchUserInfo = async ({ config, data }: PatchUserInfoConfig) =>
	api.post<UserFieldResponse>(`user/info`, data, config)

// export const postUserInfo = async ({ config, data }: PatchUserInfoConfig) =>
// 	api.post<UserFieldResponse>(`user/info`, data, config)
