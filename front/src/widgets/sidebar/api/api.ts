import { api } from '@shared/api'

import type { GetUserWorkspacesConfig, PostProjectAddConfig, WorkspacesResponse } from './types'

export const getUserWorkspaces = async ({ config }: GetUserWorkspacesConfig) =>
	api.get<WorkspacesResponse>('user/workspaces', config)

export const postProjectAdd = async ({ params, data, config }: PostProjectAddConfig) =>
	api.post(`project/${params.workspace}/add`, data, config)
