import type { ProjectIdParams, WorkspaceIdParams } from './params'
import type { TaskResponse } from './tasks'
import type { UserFieldResponse } from './user'

export interface ProjectResponse {
	description: string
	end_date?: string
	id: number
	image_url: string
	remaining_days: number
	start_date: string
	status: string
	tasks: TaskResponse[]
	title: string
}

export interface ProjectResponseWithUser {
	message: string
	user: UserFieldResponse
}

export interface ProjectData {
	status?: string
	title?: string
}
export interface UserProjectData {
	user_id: number
}

export type GetProjectsWorkspaceConfig = AxiosRequestConfig<WorkspaceIdParams>
export type PostProjectWorkspaceConfig = AxiosRequestConfig<WorkspaceIdParams, ProjectData>
export type PutProjectConfig = AxiosRequestConfig<ProjectIdParams, ProjectData>
export type DeleteProjectConfig = AxiosRequestConfig<ProjectIdParams>
export type GetProjectConfig = AxiosRequestConfig<ProjectIdParams>
export type GetUsersProjectConfig = AxiosRequestConfig<ProjectIdParams>
export type PostAssignUserToProjectConfig = AxiosRequestConfig<ProjectIdParams, UserProjectData>
export type PostKickUserFromProjectConfig = AxiosRequestConfig<ProjectIdParams, UserProjectData>
