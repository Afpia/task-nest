import { createStore } from 'effector'

import { allUserExpired } from '@shared/auth'
import type { TaskResponse } from '@shared/types'

export const $tasks = createStore([] as TaskResponse[]).reset(allUserExpired)
export const $tasksUser = createStore([] as TaskResponse[]).reset(allUserExpired)
