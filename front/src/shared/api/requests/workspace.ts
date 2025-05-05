import { api } from '@shared/api'
import type {
	GetUsersWorkspaceConfig,
	GetWorkspaceRoleConfig,
	PostAddUserToWorkspaceConfig,
	PostKickUserFromWorkspaceConfig,
	PostUserWorkspaceConfig,
	UserFieldResponse,
	WorkspaceResponse,
	WorkspaceRoleResponse
} from '@shared/types'

export type GetUserWorkspacesConfig = AxiosRequestConfig

export const getUserWorkspaces = async ({ config }: GetUserWorkspacesConfig) =>
	api.get<WorkspaceResponse[]>('user/workspaces', config)

export const getWorkspaceRole = async ({ config, params }: GetWorkspaceRoleConfig) =>
	api.get<WorkspaceRoleResponse>(`workspace/${params.workspaceId}/role`, config)

export const getUsersWorkspace = async ({ config, params }: GetUsersWorkspaceConfig) =>
	api.get<UserFieldResponse[]>(`workspace/${params.workspaceId}/users`, config)

export const postUserWorkspace = async ({ config, data }: PostUserWorkspaceConfig) =>
	api.post<{ workspace: WorkspaceResponse }>('workspace/add', data, config)

export const postAddUserToWorkspace = async ({ config, data, params }: PostAddUserToWorkspaceConfig) =>
	api.post<{ user: UserFieldResponse; message: string }>(`workspace/${params.workspaceId}/user-add`, data, config)

export const postKickUserFromWorkspace = async ({ config, data, params }: PostKickUserFromWorkspaceConfig) =>
	api.post<{ user: UserFieldResponse; message: string }>(`workspace/${params.workspaceId}/kick-user`, data, config)
