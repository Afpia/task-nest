import type { ProjectIdParams, WorkspaceIdParams } from './params'
import type { TaskResponse } from './tasks'

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

export interface ProjectData {
	title: string
}

export type GetProjectsWorkspaceConfig = AxiosRequestConfig<WorkspaceIdParams>
export type PostProjectWorkspaceConfig = AxiosRequestConfig<WorkspaceIdParams, ProjectData>
export type PutProjectConfig = AxiosRequestConfig<ProjectIdParams, ProjectData>
export type DeleteProjectConfig = AxiosRequestConfig<ProjectIdParams>
export type GetProjectConfig = AxiosRequestConfig<ProjectIdParams>
