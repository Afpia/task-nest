export type ProjectsResponse = ProjectResponse[]

export interface ProjectResponse {
	id: number
	title: string
	description: string
	start_date: string
	end_date?: string
	status: string
	remaining_days: number
	image_url: string
}

export interface ProjectsParams {
	workspaceId: string
}

export interface ProjectRequest {
	title: string
	start_date: string
	end_date: string
}

export interface ProjectData {
	title?: string
}

export type GetProjectsWorkspaceConfig = AxiosRequestConfig<ProjectsParams>
export type PostProjectWorkspaceConfig = AxiosRequestConfig<ProjectsParams, ProjectData>
