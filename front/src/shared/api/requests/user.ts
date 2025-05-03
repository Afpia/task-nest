import { api } from '@shared/api'
import type {
	GetUserIdConfig,
	GetUserInfoConfig,
	GetUserSearchConfig,
	PatchUserInfoConfig,
	UserFieldResponse
} from '@shared/types'

export const getUserInfo = async ({ config }: GetUserInfoConfig) => api.get<UserFieldResponse>(`user/info`, config)

// NOTE: Сделано post для аватарок, иначе не работает обновление аватарки
export const patchUserInfo = async ({ config, data }: PatchUserInfoConfig) =>
	api.post<UserFieldResponse>(`user/info`, data, config)

export const getUserId = async ({ config, params }: GetUserIdConfig) =>
	api.get<UserFieldResponse>(`user/${params.userId}`, config)

export const getUserSearch = async ({ config }: GetUserSearchConfig) => api.get<UserFieldResponse[]>(`search/user`, config)
