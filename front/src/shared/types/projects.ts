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
export interface PutProjectParams {
	projectId: number
}
export interface DeleteProjectParams {
	projectId: number
}

export interface GetProjectParams {
	projectId: string
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
export type PutProjectConfig = AxiosRequestConfig<PutProjectParams, ProjectData>
export type DeleteProjectConfig = AxiosRequestConfig<DeleteProjectParams>
export type GetProjectConfig = AxiosRequestConfig<GetProjectParams>
