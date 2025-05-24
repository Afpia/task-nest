import type { ROLE } from '@shared/config'

import type { WorkspaceIdParams } from './params'
import type { UserFieldResponse } from './user'

export interface WorkspaceResponse {
	description: string
	id: number
	image_url: string
	title: string
	pivot: {
		role: (typeof ROLE)[keyof typeof ROLE]
	}
}

export interface WorkspaceResponseWithUser {
	message: string
	user: UserFieldResponse
}

export interface WorkspaceRoleResponse {
	// message?: string
	role: (typeof ROLE)[keyof typeof ROLE]
}

export type WorkspaceData = FormData

export interface WorkspaceAddUserData {
	user_id: number
}
export interface WorkspaceManageUserData {
	role: Exclude<(typeof ROLE)[keyof typeof ROLE], 'owner'>
	user_id: number
}

export type PostUserWorkspaceConfig = AxiosRequestConfig<undefined, WorkspaceData>

export type GetWorkspaceRoleConfig = AxiosRequestConfig<WorkspaceIdParams>

export type PostAddUserToWorkspaceConfig = AxiosRequestConfig<WorkspaceIdParams, WorkspaceAddUserData>

export type PostKickUserFromWorkspaceConfig = AxiosRequestConfig<WorkspaceIdParams, WorkspaceAddUserData>

export type PutManageUserInWorkspaceConfig = AxiosRequestConfig<WorkspaceIdParams, WorkspaceManageUserData>

export type GetUsersWorkspaceConfig = AxiosRequestConfig<WorkspaceIdParams>
