import { createStore, sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { $isAuth } from '@shared/auth'
import { $currentWorkspace, getUserWorkspacesFx, postTaskProjectFx } from '@shared/store'

import { getWorkspaceTasks } from '../api'

export const $tasks = createStore<number>(0)

export const getWorkspaceTasksFx = createQuery({
	name: 'getWorkspaceTasks',
	handler: (workspaceId: string) => getWorkspaceTasks({ params: { workspaceId } }),
	enabled: $isAuth
})

sample({
	clock: [$currentWorkspace, getUserWorkspacesFx.finished.success, postTaskProjectFx.finished.success],
	source: $currentWorkspace,
	fn: (source) => source.id,
	target: getWorkspaceTasksFx.start
})

sample({
	clock: getWorkspaceTasksFx.finished.success,
	fn: ({ result }) => result.data.length,
	target: $tasks
})
