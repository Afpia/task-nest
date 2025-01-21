export type TasksResponse = TaskResponse[]

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
	users: Assignee[]
	who_set: string
}

// TODO: Исправить типы

export interface Assignee {
	avatar_url: string
	id: number
	name: string
}

export interface TaskRequest {
	description?: string
	end_date?: string
	start_date: string
	title: string
	// priority: string
	// status: string
	// project_id: number
	// user_id: number
}

export interface ProjectIdParams {
	projectId: number
}

export interface TaskIdParams {
	taskId: string
}

export type GetTasksProjectConfig = AxiosRequestConfig<ProjectIdParams>

export type PostTaskProjectConfig = AxiosRequestConfig<ProjectIdParams, TaskRequest>

export type PutTaskProjectConfig = AxiosRequestConfig<TaskIdParams>

export type DeleteTaskProjectConfig = AxiosRequestConfig<TaskIdParams>
