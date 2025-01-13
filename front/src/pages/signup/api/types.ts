export interface UserRequest {
	email: string
	name: string
	password: string
}

export interface UserSocialRequest {
	accessToken: string
}

export type PostUserConfig = AxiosRequestConfig<undefined, UserRequest>

export type PostUserSocialConfig = AxiosRequestConfig<undefined, UserSocialRequest>
