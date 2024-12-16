import { api } from '@shared/api'
import type { WorkspacesResponse } from '@shared/types'

export type GetUserWorkspacesConfig = AxiosRequestConfig

export const getUserWorkspaces = async ({ config }: GetUserWorkspacesConfig) =>
	api.get<WorkspacesResponse>('user/workspaces', config)
