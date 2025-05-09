import type {
	DeleteProjectConfig,
	GetProjectConfig,
	GetProjectsWorkspaceConfig,
	GetUsersProjectConfig,
	PostAssignUserToProjectConfig,
	PostKickUserFromProjectConfig,
	PostProjectWorkspaceConfig,
	ProjectResponse,
	ProjectResponseWithUser,
	PutProjectConfig,
	UserFieldResponse
} from '@shared/types'

import { api } from '../instance'

export const getProjectsWorkspace = async ({ config, params }: GetProjectsWorkspaceConfig) =>
	api.get<ProjectResponse[]>(`projects/${params.workspaceId}`, config)

export const getCurrentProject = async ({ config, params }: GetProjectConfig) =>
	api.get<{ project: ProjectResponse }>(`project/${params.projectId}`, config)

export const getUsersProject = async ({ config, params }: GetUsersProjectConfig) =>
	api.get<UserFieldResponse[]>(`project/${params.projectId}/users`, config)

export const postProjectWorkspace = async ({ params, data, config }: PostProjectWorkspaceConfig) =>
	api.post<ProjectResponse>(`project/${params.workspaceId}/add`, data, config)

export const postAssignUserToProject = async ({ params, data, config }: PostAssignUserToProjectConfig) =>
	api.post<ProjectResponseWithUser>(`project/${params.projectId}/user-add`, data, config)

export const postKickUserFromProject = async ({ params, data, config }: PostKickUserFromProjectConfig) =>
	api.post<ProjectResponseWithUser>(`project/${params.projectId}/kick-user`, data, config)

export const putProject = async ({ params, data, config }: PutProjectConfig) =>
	api.put<ProjectResponse>(`project/${params.projectId}/update`, data, config)

export const deleteProject = async ({ params, config }: DeleteProjectConfig) =>
	api.delete<ProjectResponse>(`project/${params.projectId}/delete`, config)
