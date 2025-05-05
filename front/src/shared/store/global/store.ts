import { createStore } from 'effector'

import type { EntitiesResponse } from '@shared/api'

export const $allEntities = createStore<EntitiesResponse[]>([] as EntitiesResponse[])
