import type { ProjectResponse, TaskResponse, WorkspaceResponse } from '@shared/types'

export type GetAllEntitiesConfig = AxiosRequestConfig

export type EntitiesResponse = WorkspaceResponse & {
	projects: ProjectResponse[] & {
		tasks: TaskResponse[]
	}
}
