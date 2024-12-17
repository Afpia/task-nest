import type {
	DeleteProjectConfig,
	GetProjectConfig,
	GetProjectsWorkspaceConfig,
	PostProjectWorkspaceConfig,
	ProjectResponse,
	ProjectsResponse,
	PutProjectConfig
} from '@shared/types'

import { api } from '../instance'

export const getProjectsWorkspace = async ({ config, params }: GetProjectsWorkspaceConfig) =>
	api.get<ProjectsResponse>(`projects/${params.workspaceId}`, config)

export const getCurrentProject = async ({ config, params }: GetProjectConfig) =>
	api.get<{ project: ProjectResponse }>(`project/${params.projectId}`, config)

export const postProjectWorkspace = async ({ params, data, config }: PostProjectWorkspaceConfig) =>
	api.post<ProjectResponse>(`project/${params.workspaceId}/add`, data, config)

export const putProject = async ({ params, data, config }: PutProjectConfig) =>
	api.put<ProjectResponse>(`project/${params.projectId}/update`, data, config)

export const deleteProject = async ({ params, config }: DeleteProjectConfig) =>
	api.delete<ProjectResponse>(`project/${params.projectId}/delete`, config)
