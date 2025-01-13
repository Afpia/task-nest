export interface ProjectResponse {
	description: string
	end_date?: string
	id: string
	image_url: string
	start_date: string
	status: string
	title: string
}

export interface ProjectParams {
	projectId: string
}

export type GetProjectConfig = AxiosRequestConfig<ProjectParams>
