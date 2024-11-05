export interface UserRequest {
	name: string
	email: string
	password: string
}

export interface UserSocialRequest {
	accessToken: string
}

export type PostUserConfig = AxiosRequestConfig<undefined, UserRequest>

export type PostUserSocialConfig = AxiosRequestConfig<undefined, UserSocialRequest>
