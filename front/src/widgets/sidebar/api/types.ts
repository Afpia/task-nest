export type ProjectsResponse = {
	id: number
	title: string
	description: string
	start_date: string
	end_date: string
	status: string
	remaining_days: number
}[]

export interface WorkspaceParams {
	workspace: string
}

export interface WorkspaceField {
	id: string
	title: string
	description: string
	image_url: string
}

export type WorkspacesResponse = WorkspaceField[]

export interface ProjectRequest {
	title: string
	start_date: string
	end_date: string
}

export type GetUserProjectsConfig = AxiosRequestConfig<WorkspaceParams>

export type GetUserWorkspacesConfig = AxiosRequestConfig

export interface ProjectAddRequest {
	title?: string
}
// export interface ProjectAddResponse

export type PostProjectAddConfig = AxiosRequestConfig<WorkspaceParams, ProjectAddRequest>
