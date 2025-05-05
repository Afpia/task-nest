import { createStore } from 'effector'

import type { TaskResponse } from '@shared/types'

export const $tasks = createStore([] as TaskResponse[])
export const $tasksUser = createStore([] as TaskResponse[])
