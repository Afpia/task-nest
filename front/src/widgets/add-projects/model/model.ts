import { createEvent, createStore, sample } from 'effector'

import { routes } from '@shared/config'
import { $projects, createdTask, getProjectsWorkspaceFx } from '@shared/store'
import type { ProjectResponse } from '@shared/types'

export const $projectsWidget = createStore<ProjectResponse[]>([] as ProjectResponse[])

export const changedPositionItem = createEvent<ProjectResponse[]>()
export const changedActiveProject = createEvent<number | string | null>()

export const $activeProject = createStore<number | string | null>(null).on(changedActiveProject, (_, id) => id)

const currentRoute = routes.private.home

sample({
	clock: [currentRoute.opened, getProjectsWorkspaceFx.finished.success, $projects, createdTask],
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
