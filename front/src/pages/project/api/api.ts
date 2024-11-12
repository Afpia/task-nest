import { api } from '@shared/api'

import type { GetProjectConfig, ProjectResponse } from './types'

export const getUserProject = async ({ config, params }: GetProjectConfig) =>
	api.get<ProjectResponse>(`project/${params.projectId}`, config)
