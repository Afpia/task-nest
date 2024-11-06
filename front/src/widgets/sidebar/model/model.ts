import { createEffect, createEvent, createStore, sample } from 'effector'

import { $user } from '@shared/auth'

import { getUserProjects, getUserWorkspaces } from '../api'
import type { ProjectsResponse, WorkspacesResponse } from '../api/types'

export const $projects = createStore<ProjectsResponse | []>([])
export const $workspaces = createStore<WorkspacesResponse | []>([])

export const getUserProjectsFx = createEffect((workspace: string) => getUserProjects({ params: { workspace } }))
export const getUserWorkspacesFx = createEffect(getUserWorkspaces)

sample({
	clock: getUserWorkspacesFx.doneData,
	fn: ({ data }) => data,
	target: $workspaces
})

sample({
	clock: $user,
	fn: getUserWorkspacesFx
})

// sample({
// 	clock: getUserProjectsFx.doneData,
// 	fn: ({ data }) => data,
// 	target: $projects
// })
