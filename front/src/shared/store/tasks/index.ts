import { createEffect, createEvent, createStore, sample } from 'effector'

import { deleteTaskProject, getTasksProject, postTaskProject, putTaskStatusProject } from '@shared/api'
import { notifyError } from '@shared/helpers/notification'
import type { GetTasksProjectConfig, PostTaskProjectConfig, TaskRequest, TasksResponse } from '@shared/types'

import { $currentProject } from '../projects'

export const $tasks = createStore([] as TasksResponse)
export const $tasksUser = createStore([] as TasksResponse)
export const $tasksDone = createStore([] as TasksResponse)
export const $tasksOverdue = createStore([] as TasksResponse)
export const $tasksSuspended = createStore([] as TasksResponse)
export const $tasksInProgress = createStore([] as TasksResponse)

export const getTasksProjectFx = createEffect(({ params, config }: GetTasksProjectConfig) => getTasksProject({ params, config }))
export const getTasksProjectDoneFx = createEffect(({ params, config }: GetTasksProjectConfig) =>
	getTasksProject({ params, config })
)
export const getTasksProjectOverdueFx = createEffect(({ params, config }: GetTasksProjectConfig) =>
	getTasksProject({ params, config })
)
export const getTasksProjectSuspendedFx = createEffect(({ params, config }: GetTasksProjectConfig) =>
	getTasksProject({ params, config })
)
export const getTasksProjectInProgressFx = createEffect(({ params, config }: GetTasksProjectConfig) =>
	getTasksProject({ params, config })
)
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
	fn: (clk) => ({
		params: { projectId: clk.project.id }
	}),
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
	fn: (src, clk) => ({
		params: { projectId: src.project.id },
		data: { ...clk, project_id: src.project.id, user_id: 1, start_date: '2024-12-21' }
	}),
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
	fn: (clk) => ({
		params: { projectId: clk.project.id }
	}),
	target: getTasksProjectFx
})

// Получение задачи завершена

sample({
	clock: $currentProject,
	fn: (clk) => ({
		params: {
			projectId: clk.project.id
		},
		config: {
			params: {
				filters: 'status:завершена'
			}
		}
	}),
	target: getTasksProjectDoneFx
})

sample({
	clock: getTasksProjectDoneFx.doneData,
	fn: ({ data }) => data,
	target: $tasksDone
})

sample({
	clock: getTasksProjectDoneFx.failData,
	fn: () =>
		notifyError({
			title: 'Ошибка',
			message: 'Ошибка при получении завершенных задач'
		})
})

// Получение задачи просроченных

sample({
	clock: $currentProject,
	fn: (clk) => ({
		params: {
			projectId: clk.project.id
		},
		config: {
			params: {
				filters: 'status:просрочена'
			}
		}
	}),
	target: getTasksProjectOverdueFx
})

sample({
	clock: getTasksProjectOverdueFx.doneData,
	fn: ({ data }) => data,
	target: $tasksOverdue
})

sample({
	clock: getTasksProjectOverdueFx.failData,
	fn: () =>
		notifyError({
			title: 'Ошибка',
			message: 'Ошибка при получении просроченных задач'
		})
})

// Получение задачи приостановлена

sample({
	clock: $currentProject,
	fn: (clk) => ({
		params: {
			projectId: clk.project.id
		},
		config: {
			params: {
				filters: 'status:приостановлена'
			}
		}
	}),
	target: getTasksProjectSuspendedFx
})

sample({
	clock: getTasksProjectSuspendedFx.doneData,
	fn: ({ data }) => data,
	target: $tasksSuspended
})

sample({
	clock: getTasksProjectSuspendedFx.failData,
	fn: () =>
		notifyError({
			title: 'Ошибка',
			message: 'Ошибка при получении приостановленных задач'
		})
})

// Получение задачи выполняющихся

sample({
	clock: $currentProject,
	fn: (clk) => ({
		params: {
			projectId: clk.project.id
		},
		config: {
			params: {
				filters: 'status:выполняется'
			}
		}
	}),
	target: getTasksProjectInProgressFx
})

sample({
	clock: getTasksProjectInProgressFx.doneData,
	fn: ({ data }) => data,
	target: $tasksInProgress
})

sample({
	clock: getTasksProjectInProgressFx.failData,
	fn: () =>
		notifyError({
			title: 'Ошибка',
			message: 'Ошибка при получении выполняющихся задач'
		})
})
