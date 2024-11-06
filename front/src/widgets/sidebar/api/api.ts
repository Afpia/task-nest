import { api } from '@shared/api'

import type { GetUserProjectsConfig, ProjectsResponse } from './types'

export const getUserProjects = async ({ config, params }: GetUserProjectsConfig) =>
	api.get<ProjectsResponse>(`user/${params.user_id}/projects`, config)

// export const getUserWorkspaces = async (config: any) => api.get('user/workspaces', config)
