import type { ProjectIdParams, TaskIdParams } from './params'

export interface TaskResponse {
	assignee: Assignee[]
	description?: string
	end_date?: string
	id: number
	progress: number
	project_id: number
	start_date: string
	status: string
	title: string
	who_set: string
}

export interface Assignee {
	avatar_url: string
	email: string
	id: number
	name: string
}

export interface TaskRequest {
	description?: string
	end_date?: string
	start_date: string
	title: string
}

export type GetTasksProjectConfig = AxiosRequestConfig<ProjectIdParams>

export type PostTaskProjectConfig = AxiosRequestConfig<ProjectIdParams, TaskRequest>

export type PutTaskProjectConfig = AxiosRequestConfig<TaskIdParams>

export type DeleteTaskProjectConfig = AxiosRequestConfig<TaskIdParams>
