import { createEffect, createStore, sample } from 'effector'

import { getUserProjects } from '../api'
import type { ProjectsResponse } from '../api/types'

const $pending = createStore(true)
const $data = createStore<ProjectsResponse | null>(null)

const getUserProjectsFx = createEffect(async () => {
	const response = await getUserProjects({ params: { user_id: 1 } })
	return response.data
})

sample({
	clock: getUserProjectsFx.doneData,
	target: $data
})

sample({
	clock: getUserProjectsFx.pending,
	target: $pending
})
