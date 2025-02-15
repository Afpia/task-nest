import { api } from '@shared/api'
import type { ProjectParams, TasksResponse } from '@shared/types'

export type GetWorkspaceTasksConfig = AxiosRequestConfig<ProjectParams>

export const getWorkspaceTasks = async ({ config, params }: GetWorkspaceTasksConfig) =>
	api.get<TasksResponse>(`workspaces/${params.workspaceId}/tasks`, config)
