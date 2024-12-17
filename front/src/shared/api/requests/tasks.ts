import type {
	DeleteTaskProjectConfig,
	GetTasksProjectConfig,
	PostTaskProjectConfig,
	PutTaskProjectConfig,
	TaskResponse,
	TasksResponse
} from '@shared/types'

import { api } from '../instance'

export const getTasksProject = async ({ config, params }: GetTasksProjectConfig) =>
	api.get<TasksResponse>(`tasks/${params.projectId}`, config)

// export const getTasksUserProject = async ({ params, data, config }) => api.get<TasksResponse>(``, data, config)

export const postTaskProject = async ({ params, data, config }: PostTaskProjectConfig) =>
	api.post<TaskResponse>(`task/${params.projectId}/add`, data, config)

export const putTaskStatusProject = async ({ params, data, config }: PutTaskProjectConfig) =>
	api.put<TaskResponse>(`task/${params.taskId}/update-status`, data, config)

export const deleteTaskProject = async ({ params, config }: DeleteTaskProjectConfig) =>
	api.delete<TaskResponse>(`task/${params.taskId}/delete`, config)
