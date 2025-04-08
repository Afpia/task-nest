export interface WorkspaceResponse {
	description: string
	id: string
	image_url: string
	title: string
}

export interface WorkspaceData {
	title: string
}

export type PostUserWorkspaceConfig = AxiosRequestConfig<undefined, WorkspaceData>
