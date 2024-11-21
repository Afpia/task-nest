import type { ProjectsParams, ProjectsResponse } from '@shared/types'

import { api } from '../instance'

export type GetUserProjectsConfig = AxiosRequestConfig<ProjectsParams>

export const getUserProjects = async ({ config, params }: GetUserProjectsConfig) =>
	api.get<ProjectsResponse>(`projects/${params.workspace}`, config)
