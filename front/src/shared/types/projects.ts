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

export interface ProjectParams {
	workspaceId: string
}
export interface ProjectPutParams {
	projectId: number
}
export interface ProjectDeleteParams {
	projectId: number
}

export interface ProjectRequest {
	title: string
	start_date: string
	end_date: string
}

export interface ProjectData {
	title?: string
}

export type GetProjectsWorkspaceConfig = AxiosRequestConfig<ProjectParams>
export type PostProjectWorkspaceConfig = AxiosRequestConfig<ProjectParams, ProjectData>
export type PutProjectConfig = AxiosRequestConfig<ProjectPutParams, ProjectData>
export type DeleteProjectConfig = AxiosRequestConfig<ProjectDeleteParams>
