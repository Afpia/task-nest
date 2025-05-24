import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'

import { putTaskProject, putTaskStatusProject } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { notifyError, notifySuccess } from '@shared/helpers'
import type { TaskResponse } from '@shared/types'
// FIXME: Импорт вынести глобально статистику workspace
import { $tasks as $tasksWorkspace } from '@widgets/stats-workspace/model'

import { $currentTask, $tasks } from './store'

export const updatedStatusTask = createEvent<string>()
export const updatedTask = createEvent<FormData>()

const putTaskStatusProjectFx = createMutation({
	name: 'putTaskStatusProject',
	handler: ({ taskId, data }) => putTaskStatusProject({ params: { taskId }, data }),
	enabled: $isAuth
})

const putTaskProjectFx = createMutation({
	name: 'putTaskProject',
	handler: ({ taskId, data }) => putTaskProject({ params: { taskId }, data }),
	enabled: $isAuth
})

// Обновление статуса

sample({
	clock: updatedStatusTask,
	source: $currentTask,
	fn: (source, clock) => ({ taskId: source?.id, data: { status: clock } }),
	target: putTaskStatusProjectFx.start
})

sample({
	clock: putTaskStatusProjectFx.finished.success,
	source: $currentTask,
	fn: (source, clock) => {
		notifySuccess({
			title: 'Успех',
			message: 'Статус задачи изменен'
		})
		return { ...source, status: clock.result.data.status } as TaskResponse
	},
	target: $currentTask
})

sample({
	clock: putTaskStatusProjectFx.finished.success,
	source: {
		tasks: $tasks,
		currentTask: $currentTask
	},
	fn: ({ tasks, currentTask }) => {
		if (!currentTask) return tasks
		return tasks.map((task) => (task.id === currentTask.id ? { ...task, status: currentTask.status } : task))
	},
	target: $tasks
})

sample({
	clock: putTaskStatusProjectFx.finished.success,
	source: {
		tasks: $tasks,
		currentTask: $currentTask
	},
	fn: ({ tasks, currentTask }) => {
		if (!currentTask) return tasks
		return tasks.map((task) => (task.id === currentTask.id ? { ...task, status: currentTask.status } : task))
	},
	target: $tasks
})

sample({
	clock: putTaskStatusProjectFx.finished.success,
	source: {
		tasks: $tasks,
		currentTask: $currentTask
	},
	fn: ({ tasks, currentTask }) => {
		if (!currentTask) return tasks
		return tasks.map((task) => (task.id === currentTask.id ? { ...task, status: currentTask.status } : task))
	},
	target: $tasksWorkspace
})

sample({
	clock: putTaskStatusProjectFx.finished.failure,
	fn: () =>
		notifyError({
			title: 'Ошибка',
			message: 'Статус задачи не был изменен'
		})
})

// Обновление задачи

sample({
	clock: updatedTask,
	source: $currentTask,
	fn: (source, clock) => ({ taskId: source?.id, data: clock }),
	target: putTaskProjectFx.start
})

sample({
	clock: putTaskProjectFx.finished.success,
	source: $currentTask,
	fn: (source, clock) => {
		notifySuccess({
			title: 'Успех',
			message: 'Задача обновлена'
		})
		return { ...source, ...clock.result.data }
	},
	target: $currentTask
})

sample({
	clock: putTaskProjectFx.finished.success,
	source: {
		tasks: $tasks,
		currentTask: $currentTask
	},
	fn: ({ tasks, currentTask }, clock) => {
		if (!currentTask) return tasks
		return tasks.map((task) => (task.id === currentTask.id ? { ...task, ...clock.result.data } : task))
	},
	target: $tasks
})

sample({
	clock: putTaskProjectFx.finished.failure,
	fn: () =>
		notifyError({
			title: 'Ошибка',
			message: 'Задача не была обновлена'
		})
})
