import { api } from '@shared/api'
import type { TaskResponse, WorkspaceIdParams } from '@shared/types'

export type GetWorkspaceTasksConfig = AxiosRequestConfig<WorkspaceIdParams>

export const getWorkspaceTasks = async ({ config, params }: GetWorkspaceTasksConfig) =>
	api.get<TaskResponse[]>(`workspaces/${params.workspaceId}/tasks`, config)
