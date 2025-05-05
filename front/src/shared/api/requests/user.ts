import { api } from '@shared/api'
import type {
	GetUserInfoConfig,
	GetUserLoginConfig,
	GetUserSearchConfig,
	PatchUserInfoConfig,
	UserFieldResponse
} from '@shared/types'

export const getUserInfo = async ({ config }: GetUserInfoConfig) => api.get<UserFieldResponse>(`user/info`, config)

// NOTE: Сделано post для аватарок, иначе не работает обновление аватарки
export const patchUserInfo = async ({ config, data }: PatchUserInfoConfig) =>
	api.post<UserFieldResponse>(`user/info`, data, config)

export const getUserLogin = async ({ config, params }: GetUserLoginConfig) =>
	api.get<UserFieldResponse>(`user/${params.userLogin}`, config)

export const getUserSearch = async ({ config }: GetUserSearchConfig) => api.get<UserFieldResponse[]>(`search/user`, config)

// NOTE: Сделано post для обоев, иначе не работает обновление
export const patchUserInfoBackground = async ({ config, data }: PatchUserInfoConfig) =>
	api.post<UserFieldResponse>(`user/info/background`, data, config)
