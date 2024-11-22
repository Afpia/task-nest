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

export type GetUserWorkspacesConfig = AxiosRequestConfig

export interface ProjectAddRequest {
	title?: string
}
// export interface ProjectAddResponse

export type PostProjectAddConfig = AxiosRequestConfig<WorkspaceParams, ProjectAddRequest>
