export interface UserResponse {
	access_token: string
	user: UserFieldResponse
}

export interface UserFieldResponse {
	avatar_url: string
	created_at: string
	email: string
	id: number
	name: string
	updated_at: string
}

export interface UserInfoParams {
	columns?: keyof UserFieldResponse
}

export interface UserFieldData {
	avatar_url: string
	created_at: string
	email: string
	name: string
}

export type UserFieldPartialData = Partial<UserFieldData>

export type GetUserInfoConfig = AxiosRequestConfig

export type PatchUserInfoConfig = AxiosRequestConfig<undefined, UserFieldPartialData>
