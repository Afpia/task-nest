import { chainRoute } from 'atomic-router'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { allUserExpired, privateMain } from '@shared/auth'
import { path, routes } from '@shared/config'

import { getUserProjects, getUserWorkspaces } from '../api'
import type { ProjectsResponse, WorkspaceField, WorkspacesResponse } from '../api/types'

// export const currentRoute = routes.private.home || routes.private.profile

function getCurrentRoute(location: string) {
	// if (location === path.HOME) return routes.private.home
	if (location === path.PROFILE) return routes.private.profile
	return routes.private.home
}

export const currentRoute = getCurrentRoute(window.location.pathname)

export const $projects = createStore<ProjectsResponse>([] as ProjectsResponse)
export const $workspaces = createStore<WorkspacesResponse>([] as WorkspacesResponse)
export const $currentWorkspace = createStore<WorkspaceField>({} as WorkspaceField).reset(allUserExpired)

export const getUserProjectsFx = createEffect((workspace: string) => getUserProjects({ params: { workspace } }))
export const getUserWorkspacesFx = createEffect(getUserWorkspaces)

export const changedWorkspace = createEvent<string>()

sample({
	clock: getUserWorkspacesFx.doneData,
	fn: ({ data }) => data,
	target: $workspaces
})

// TODO: как сделать layout один раз вызываемым
chainRoute({
	route: privateMain(currentRoute),
	beforeOpen: {
		effect: getUserWorkspacesFx,
		mapParams: ({ params, query }) => ({
			data: undefined,
			config: {
				params,
				...query
			}
		})
	}
})

sample({
	clock: getUserWorkspacesFx.doneData,
	fn: ({ data }) => data[0],
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
	fn: (workspaces, workspace) => workspaces.find((item) => item.id === workspace) || workspaces[0],
	target: $currentWorkspace
})

sample({
	clock: getUserWorkspacesFx.doneData,
	source: $currentWorkspace,
	fn: (workspace) => workspace.title,
	target: getUserProjectsFx
})

sample({
	clock: getUserProjectsFx.doneData,
	fn: ({ data }) => data,
	target: $projects
})
