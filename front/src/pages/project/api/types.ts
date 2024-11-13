export interface ProjectResponse {
	id: string
	title: string
	description: string
	start_date: string
	end_date?: string
	status: string
	image_url: string
}

export interface ProjectParams {
	projectId: string
}

export type GetProjectConfig = AxiosRequestConfig<ProjectParams>
