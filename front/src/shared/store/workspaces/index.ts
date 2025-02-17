import { redirect } from 'atomic-router'
import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { getUserWorkspaces } from '@shared/api'
import { $isAuth, allUserExpired } from '@shared/auth'
import { privateRouteOpened, routes } from '@shared/config'
import type { WorkspaceResponse, WorkspacesResponse } from '@shared/types'

export const $currentWorkspace = createStore<WorkspaceResponse>({} as WorkspaceResponse).reset(allUserExpired)
export const $workspaces = createStore<WorkspacesResponse>([] as WorkspacesResponse).reset(allUserExpired)

export const getUserWorkspacesFx = createEffect(getUserWorkspaces)

export const changedWorkspace = createEvent<string>()

sample({
	clock: [privateRouteOpened],
	source: $workspaces,
	filter: combine(
		$workspaces.map((workspaces) => !workspaces.length),
		$isAuth,
		(isEmpty, isAuth) => isEmpty && isAuth
	),
	fn: () => ({ config: {} }),
	target: getUserWorkspacesFx
})

// TODO: Может не работать, делаются запросы при отсутствия токена

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

redirect({
	clock: $currentWorkspace,
	replace: true,
	route: routes.private.home
})
