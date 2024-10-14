import { api } from '@utils/api/instance'

export interface UserRequest {
	email: string
	password: string
}

export interface UserResponse {
	access_token: string
	id: number
	name: string
	email: string
	role: string
	created_at: string
	updated_at: string
}

export type GetLoginConfig = AxiosRequestConfig<undefined, undefined>

export type PostUserConfig = AxiosRequestConfig<undefined, UserRequest>

export const getGithubToken = async (requestConfig?: GetLoginConfig) =>
	api.post<UserResponse>('auth/github/redirect', requestConfig)

export const getGoogleToken = async (requestConfig?: GetLoginConfig) =>
	api.post<UserResponse>('auth/google/redirect', requestConfig)

export const getYandexToken = async (requestConfig?: GetLoginConfig) =>
	api.post<UserResponse>('auth/yandex/redirect', requestConfig)

export const postUser = async (requestConfig?: PostUserConfig) => api.post<UserResponse>('login', requestConfig)
