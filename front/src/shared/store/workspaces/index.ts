import { createEffect, createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { getUserWorkspaces } from '@shared/api'
import { allUserExpired } from '@shared/auth'
import { privateRouteOpened } from '@shared/config'
import type { WorkspaceResponse, WorkspacesResponse } from '@shared/types'

export const $currentWorkspace = createStore<WorkspaceResponse>({} as WorkspaceResponse).reset(allUserExpired)
export const $workspaces = createStore<WorkspacesResponse>([] as WorkspacesResponse).reset(allUserExpired)

export const getUserWorkspacesFx = createEffect(getUserWorkspaces)

export const changedWorkspace = createEvent<string>()

sample({
	clock: [privateRouteOpened],
	source: $workspaces,
	filter: $workspaces.map((workspaces) => !workspaces.length),
	fn: () => ({ config: {} }),
	target: getUserWorkspacesFx
})

sample({
	clock: getUserWorkspacesFx.doneData,
	fn: ({ data }) => data,
	target: $workspaces
})

sample({
	clock: getUserWorkspacesFx.doneData,
	source: $currentWorkspace,
	fn: (source, { data }) => {
		if (source.id) {
			return source
		} else {
			return data[0]
		}
	},
	target: $currentWorkspace
})

persist({
	key: 'workspace',
	store: $currentWorkspace,
	serialize: (state) => JSON.stringify(state),
	deserialize: (state) => JSON.parse(state)
})

sample({
	clock: changedWorkspace,
	source: $workspaces,
	fn: (source, clock) => source.find((item) => item.title === clock) || source[0],
	target: $currentWorkspace
})

$workspaces.watch(console.log)
