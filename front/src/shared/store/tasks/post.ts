import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'

import { postTaskProject } from '@shared/api'
import { $isAuth } from '@shared/auth'
import type { PostTaskProjectConfig } from '@shared/types'

import { $currentProject } from '../projects'

import { getTasksProjectFx } from './get'
import { $currentTask, $tasks } from './store'

export const createdTask = createEvent<FormData>()
export const currentTaskSet = createEvent<number>()

export const postTaskProjectFx = createMutation({
	name: 'postTaskProject',
	handler: ({ params, data }: PostTaskProjectConfig) => postTaskProject({ params, data }),
	enabled: $isAuth
})

// Получение текущей задачи

sample({
	clock: currentTaskSet,
	source: $tasks,
	fn: (source, clock) => source.find((item) => item.id === clock) ?? null,
	target: $currentTask
})

// Создание задачи

sample({
	clock: createdTask,
	source: $currentProject,
	fn: (source, clock) => ({
		params: { projectId: source.project.id.toString() },
		data: clock
	}),
	target: postTaskProjectFx.start
})

sample({
	clock: postTaskProjectFx.finished.success,
	source: $currentProject,
	fn: (clock) => ({
		params: { projectId: clock.project.id.toString() }
	}),
	target: getTasksProjectFx.start
})
