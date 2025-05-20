import { createEvent, createStore, sample } from 'effector'

import type { TaskResponse } from '@shared/types'
import { $tasks } from '@widgets/stats-workspace/model'

export const $assignedTaskWidget = createStore<TaskResponse[]>([] as TaskResponse[])

export const changedPositionItem = createEvent<TaskResponse[]>()
export const changedActiveTask = createEvent<number | string | null>()

export const $activeTask = createStore<number | string | null>(null).on(changedActiveTask, (_, id) => id)

// const currentRoute = routes.private.home

// sample({
// 	clock: [currentRoute.opened, getProjectsWorkspaceFx.finished.success, $projects, createdTask],
// 	source: $projects,
// 	fn(source) {
// 		return [
// 			{
// 				id: -1,
// 				title: 'Добавление проекта',
// 				description: '',
// 				start_date: '',
// 				status: '',
// 				remaining_days: 0,
// 				image_url: '',
// 				tasks: []
// 			},
// 			...source
// 		]
// 	},
// 	target: $projectsWidget
// })

sample({
	clock: changedPositionItem,
	target: $tasks
})
