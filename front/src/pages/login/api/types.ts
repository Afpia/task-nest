export interface UserRequest {
	email: string
	password: string
}
export interface UserSocialRequest {
	accessToken: string
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

export type PostUserSocialConfig = AxiosRequestConfig<undefined, UserSocialRequest>
