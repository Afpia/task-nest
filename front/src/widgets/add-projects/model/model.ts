import { createEvent, createStore, sample } from 'effector'

import { routes } from '@shared/config'
import { $projects, getProjectsWorkspaceFx } from '@shared/store'
import type { ProjectsResponse } from '@shared/types'

export const $projectsWidget = createStore<ProjectsResponse>([] as ProjectsResponse)

export const addedProjects = createEvent<string>()
export const receivedProjectPosition = createEvent<string | number>()

const currentRoute = routes.private.home

sample({
	clock: [currentRoute.opened, getProjectsWorkspaceFx.doneData],
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
				image_url: ''
			},
			...source
		]
	},
	target: $projectsWidget
})

export const taskPosition = sample({
	clock: receivedProjectPosition,
	source: $projects,
	fn(source, clock) {
		return source.findIndex((item) => item.id === clock)
	}
})
