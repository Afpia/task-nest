export type TasksResponse = TaskResponse[]

export interface TaskResponse {
	id: number
	title: string
	description?: string
	start_date: string
	end_date?: string
	status: string
	project_name: number
	progress: number
	assignee: Assignee[]
}

export interface Assignee {
	id: number
	name: string
	avatar_url: string
}

export interface TaskRequest {
	title: string
	description?: string
	start_date: string
	end_date?: string
	priority: string
	// status: string
	project_id: number
	user_id: number
}

export interface ProjectIdParams {
	projectId: string
}

export interface TaskIdParams {
	taskId: string
}

export type GetTasksProjectConfig = AxiosRequestConfig<ProjectIdParams>

export type PostTaskProjectConfig = AxiosRequestConfig<ProjectIdParams, TaskRequest>

export type PutTaskProjectConfig = AxiosRequestConfig<TaskIdParams>

export type DeleteTaskProjectConfig = AxiosRequestConfig<TaskIdParams>
