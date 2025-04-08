import { api } from '@shared/api'
import type { PostUserWorkspaceConfig, WorkspaceResponse } from '@shared/types'

export type GetUserWorkspacesConfig = AxiosRequestConfig

export const getUserWorkspaces = async ({ config }: GetUserWorkspacesConfig) =>
	api.get<WorkspaceResponse[]>('user/workspaces', config)

export const postUserWorkspace = async ({ config, data }: PostUserWorkspaceConfig) =>
	api.post<WorkspaceResponse>('workspace/add', data, config)
