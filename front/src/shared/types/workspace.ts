import type { role } from '@shared/config'

export interface WorkspaceResponse {
	description: string
	id: number
	image_url: string
	title: string
	pivot: {
		role: (typeof role)[keyof typeof role]
	}
}

export interface WorkspaceRoleResponse {
	// message?: string
	role: (typeof role)[keyof typeof role]
}

export interface WorkspaceIdParams {
	workspaceId: string
}
export interface WorkspaceData {
	title: string
}

export interface WorkspaceAddUserData {
	user_id: number
}

export type PostUserWorkspaceConfig = AxiosRequestConfig<undefined, WorkspaceData>

export type GetWorkspaceRoleConfig = AxiosRequestConfig<WorkspaceIdParams>

export type PostAddUserToWorkspaceConfig = AxiosRequestConfig<WorkspaceIdParams, WorkspaceAddUserData>

export type GetUsersWorkspaceConfig = AxiosRequestConfig<WorkspaceIdParams>
