import { createEffect, createStore, sample } from 'effector'

import { getUserProjects } from '../api'
import type { ProjectsResponse } from '../api/types'

export const $projects = createStore<ProjectsResponse | []>([])
export const getUserProjectsFx = createEffect((id: number) => getUserProjects({ params: { user_id: id } }))
export const getUserWorkspacesFx = createEffect()

sample({
	clock: getUserProjectsFx.doneData,
	fn: ({ data }) => data,
	target: $projects
})

// sample({
// 	clock: getUserProjectsFx.failData,
// })
