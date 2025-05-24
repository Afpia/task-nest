import type { ProjectIdParams, TaskIdParams } from './params'
import type { UserFieldResponse } from './user'

export interface TaskResponse {
	description?: string
	end_date?: string
	files: Files[]
	id: number
	progress: number
	project_id: number
	start_date: string
	status: string
	title: string
	users: UserFieldResponse[]
}

export interface Files {
	id: number
	mime_type: string
	original_name: string
	path: string
	size: string
}

export interface PutTaskProjectData {
	status: 'Выполняется' | 'Завершена' | 'Приостановлена'
}

export type GetTasksProjectConfig = AxiosRequestConfig<ProjectIdParams>

export type PostTaskProjectConfig = AxiosRequestConfig<ProjectIdParams, FormData>

export type PutTaskStatusProjectConfig = AxiosRequestConfig<TaskIdParams, PutTaskProjectData>

export type PutTaskProjectConfig = AxiosRequestConfig<TaskIdParams, FormData>

export type DeleteTaskProjectConfig = AxiosRequestConfig<TaskIdParams>
