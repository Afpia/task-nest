import { api } from '@utils/api/instance'

export interface UserRequest {
	email: string
	password: string
}

export interface UserResponse {
	id: number
	name: string
	email: string
	role: string
	created_at: string
	updated_at: string
}

export type PostUserConfig = AxiosRequestConfig<undefined, UserRequest>

export const postUser = async (requestConfig?: PostUserConfig) => api.post<UserResponse>('login', requestConfig)
