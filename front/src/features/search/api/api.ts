import { api } from '@shared/api'

import type { EntitiesResponse, GetAllEntitiesConfig } from './types'

export const getAllEntities = async ({ config }: GetAllEntitiesConfig) => api.get<EntitiesResponse[]>(`projects/tasks`, config)
