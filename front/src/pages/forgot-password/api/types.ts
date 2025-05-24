export interface PasswordEmailData {
	email: string
}

export type PostPasswordEmailConfig = AxiosRequestConfig<undefined, PasswordEmailData>
