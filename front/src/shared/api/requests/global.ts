import type { ProjectResponse, TaskResponse, WorkspaceResponse } from '@shared/types'

import { api } from '../instance'

export type GetAllEntitiesConfig = AxiosRequestConfig

export type EntitiesResponse = WorkspaceResponse & {
	projects: ProjectResponse[] & {
		tasks: TaskResponse[]
	}
}

export const getAllEntities = async ({ config }: GetAllEntitiesConfig) => api.get<EntitiesResponse[]>(`projects/tasks`, config)
