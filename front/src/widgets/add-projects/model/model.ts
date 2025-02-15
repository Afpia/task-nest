import { createEvent, createStore, sample } from 'effector'

import { routes } from '@shared/config'
import { $projects, getProjectsWorkspaceFx } from '@shared/store'
import type { ProjectsResponse } from '@shared/types'

export const $projectsWidget = createStore<ProjectsResponse>([] as ProjectsResponse)

export const changedPositionItem = createEvent<ProjectsResponse>()
export const changedActiveProject = createEvent<number | string | null>()

export const $activeProject = createStore<number | string | null>(null).on(changedActiveProject, (_, id) => id)

const currentRoute = routes.private.home

sample({
	clock: [currentRoute.opened, getProjectsWorkspaceFx.doneData, $projects],
	source: $projects,
	fn(source) {
		return [
			{
				id: -1,
				title: 'Добавление проекта',
				description: '',
				start_date: '',
				status: '',
				remaining_days: 0,
				image_url: '',
				tasks: []
			},
			...source
		]
	},
	target: $projectsWidget
})

sample({
	clock: changedPositionItem,
	target: $projectsWidget
})
