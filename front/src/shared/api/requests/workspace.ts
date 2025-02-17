import { api } from '@shared/api'
import type { WorkspaceResponse } from '@shared/types'

export type GetUserWorkspacesConfig = AxiosRequestConfig

export const getUserWorkspaces = async ({ config }: GetUserWorkspacesConfig) =>
	api.get<WorkspaceResponse[]>('user/workspaces', config)
