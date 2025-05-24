export interface PasswordResetData {
	email: string
	password: string
	token: string
}

export type PostPasswordResetConfig = AxiosRequestConfig<undefined, PasswordResetData>
