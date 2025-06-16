import type { ROLE } from '@shared/config'

import type { UserDeleteParams, UserLoginParams } from './params'
import type { TaskResponse } from './tasks'

export interface UserResponse {
	access_token: string
	user: UserFieldResponse
}

export interface UserFieldResponse {
	about: string
	avatar_url: string
	background_url: string
	city: string
	created_at: string
	email: string
	id: number
	login: string
	name: string
	tasks: TaskResponse[]
	updated_at: string
	pivot: {
		role: (typeof ROLE)[keyof typeof ROLE]
	}
}

export interface UserFieldData {
	avatar_url: string
	current_password: string
	email: string
	login: string
	name: string
	password: string
}

export type UserFieldPartialData = FormData | Partial<UserFieldData>

export type GetUserInfoConfig = AxiosRequestConfig
export type GetUserSearchConfig = AxiosRequestConfig
export type GetUserLoginConfig = AxiosRequestConfig<UserLoginParams>

export type PatchUserInfoConfig = AxiosRequestConfig<undefined, UserFieldPartialData>
export type DeleteUserConfig = AxiosRequestConfig<UserDeleteParams>
