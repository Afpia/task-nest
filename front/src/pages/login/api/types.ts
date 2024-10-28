export interface UserRequest {
	email: string
	password: string
}
export interface UserSocialRequest {
	accessToken: string
}

export type GetLoginConfig = AxiosRequestConfig<undefined, undefined>

export type PostUserConfig = AxiosRequestConfig<undefined, UserRequest>

export type PostUserSocialConfig = AxiosRequestConfig<undefined, UserSocialRequest>
