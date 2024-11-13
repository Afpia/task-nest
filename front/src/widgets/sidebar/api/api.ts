import { api } from '@shared/api'

import type {
	GetUserProjectsConfig,
	GetUserWorkspacesConfig,
	PostProjectAddConfig,
	ProjectsResponse,
	WorkspacesResponse
} from './types'

export const getUserProjects = async ({ config, params }: GetUserProjectsConfig) =>
	api.get<ProjectsResponse>(`projects/${params.workspace}`, config)

export const getUserWorkspaces = async ({ config }: GetUserWorkspacesConfig) =>
	api.get<WorkspacesResponse>('user/workspaces', config)

export const postProjectAdd = async ({ params, data, config }: PostProjectAddConfig) =>
	api.post(`project/${params.workspace}/add`, data, config)
