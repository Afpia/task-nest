export type ProjectsResponse = ProjectResponse[]

export interface ProjectResponse {
	description: string
	end_date?: string
	id: number
	image_url: string
	remaining_days: number
	start_date: string
	status: string
	title: string
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
	end_date: string
	start_date: string
	title: string
}

export interface ProjectData {
	title?: string
}

export type GetProjectsWorkspaceConfig = AxiosRequestConfig<ProjectParams>
export type PostProjectWorkspaceConfig = AxiosRequestConfig<ProjectParams, ProjectData>
export type PutProjectConfig = AxiosRequestConfig<PutProjectParams, ProjectData>
export type DeleteProjectConfig = AxiosRequestConfig<DeleteProjectParams>
export type GetProjectConfig = AxiosRequestConfig<GetProjectParams>
