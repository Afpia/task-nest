import { createEffect, createStore, sample } from 'effector'

import { $currentWorkspace, getUserWorkspacesFx } from '@shared/store'

import { getWorkspaceTasks } from '../api'

export const $tasks = createStore<number>(0)

const getWorkspaceTasksFx = createEffect((workspaceId: string) => getWorkspaceTasks({ params: { workspaceId } }))

sample({
	clock: [$currentWorkspace, getUserWorkspacesFx.doneData],
	source: $currentWorkspace,
	fn: (source) => source.id,
	target: getWorkspaceTasksFx
})

sample({
	clock: getWorkspaceTasksFx.doneData,
	fn: ({ data }) => data.length,
	target: $tasks
})
