export type ProjectsResponse = {
	id: number
	title: string
	description: string
	start_date: string
	end_date: string
	status: string
	remaining_days: number
}[]

export interface UserParams {
	workspace: string
}

export type WorkspacesResponse = WorkspaceField[]

export interface WorkspaceField {
	id: string
	title: string
	description: string
	image_url: string
}

export type GetUserProjectsConfig = AxiosRequestConfig<UserParams>

export type GetUserWorkspacesConfig = AxiosRequestConfig
