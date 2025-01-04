import { createEffect, createEvent, createStore, sample } from 'effector'

import { startNavigationProgress } from '@mantine/nprogress'

import { deleteTaskProject, getTasksProject, postTaskProject, putTaskStatusProject } from '@shared/api'
import { notifyError } from '@shared/helpers/notification'
import type { PostTaskProjectConfig, TaskRequest, TasksResponse } from '@shared/types'

import { $currentProject } from '../projects'

export const $tasks = createStore([] as TasksResponse)
export const $tasksUser = createStore([] as TasksResponse)

export const getTasksProjectFx = createEffect((projectId: number) => getTasksProject({ params: { projectId } }))
export const getUserTasksProjectFx = createEffect()

export const postTaskProjectFx = createEffect(({ params, data }: PostTaskProjectConfig) => postTaskProject({ params, data }))

export const putTaskStatusProjectFx = createEffect((taskId: string) => putTaskStatusProject({ params: { taskId } }))

export const deleteTaskProjectFx = createEffect((taskId: string) => deleteTaskProject({ params: { taskId } }))

export const createdTask = createEvent<TaskRequest>()

// Загрузка текущих задач

sample({
	clock: $currentProject,
	// source: $tasks,
	// filter: $tasks.map((tasks) => !tasks.length),
	fn: ({ project }) => project.id,
	target: getTasksProjectFx
})

sample({
	clock: getTasksProjectFx.doneData,
	fn: ({ data }) => data,
	target: $tasks
})

sample({
	clock: getTasksProjectFx.failData,
	fn: () =>
		notifyError({
			title: 'Ошибка',
			message: 'Ошибка при получении задач'
		})
})

// Создание задачи

sample({
	clock: createdTask,
	source: $currentProject,
	fn: (src, clk) => {
		startNavigationProgress()

		return {
			params: { projectId: src.project.id },
			data: { ...clk, project_id: src.project.id, user_id: 1, priority: 'Средний', start_date: '2024-12-21' }
		}
	},
	target: postTaskProjectFx
})

// sample({
// 	clock: postTaskProjectFx.doneData,
// 	source: $tasks,
// 	fn: (src, clk) => [...src, clk.data],
// 	target: $tasks
// })

sample({
	clock: postTaskProjectFx.doneData,
	source: $currentProject,
	fn: ({ project }) => project.id,
	target: getTasksProjectFx
})
