import type { GetProjectsWorkspaceConfig, PostProjectWorkspaceConfig, ProjectsResponse } from '@shared/types'

import { api } from '../instance'

export const getProjectsWorkspace = async ({ config, params }: GetProjectsWorkspaceConfig) =>
	api.get<ProjectsResponse>(`projects/${params.workspaceId}`, config)

export const postProjectWorkspace = async ({ params, data, config }: PostProjectWorkspaceConfig) =>
	api.post(`project/${params.workspaceId}/add`, data, config)
