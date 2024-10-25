export interface ProjectsResponse {
	id: number
	title: string
	description: string
	start_date: string
	end_date: string
	status: string
	remaining_days: number
}

export interface UserParams {
	user_id: number
}

export type GetUserProjectsConfig = AxiosRequestConfig<UserParams, undefined>
