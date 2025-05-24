import { createStore, sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { $isAuth } from '@shared/auth'
import { $currentWorkspace, getUserWorkspacesFx, postTaskProjectFx } from '@shared/store'
import type { TaskResponse } from '@shared/types'

import { getWorkspaceTasks } from '../api'

export const $tasks = createStore<TaskResponse[]>([] as TaskResponse[])

export const getWorkspaceTasksFx = createQuery({
	name: 'getWorkspaceTasks',
	handler: (workspaceId: string) => getWorkspaceTasks({ params: { workspaceId } }),
	enabled: $isAuth
})

sample({
	clock: [$currentWorkspace, getUserWorkspacesFx.finished.success, postTaskProjectFx.finished.success],
	source: $currentWorkspace,
	filter: $isAuth,
	fn: (source) => source.id.toString(),
	target: getWorkspaceTasksFx.start
})

sample({
	clock: getWorkspaceTasksFx.finished.success,
	fn: ({ result }) => result.data,
	target: $tasks
})
