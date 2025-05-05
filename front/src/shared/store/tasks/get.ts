import { sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { getTasksProject } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { notifyError } from '@shared/helpers'
import type { GetTasksProjectConfig } from '@shared/types'

import { $currentProject } from '../projects'

import { $tasks } from './store'

export const getTasksProjectFx = createQuery({
	name: 'getTasksProject',
	handler: ({ params, config }: GetTasksProjectConfig) => getTasksProject({ params, config }),
	enabled: $isAuth
})

// export const getUserTasksProjectFx = createQuery({
// 	name: 'getUserTasksProject',
// 	handler: (projectId: string) => getCurrentProject({ params: { projectId } }),
// 	enabled: $isAuth
// })

sample({
	clock: $currentProject,
	// source: $tasks,
	// filter: $tasks.map((tasks) => !tasks.length),
	fn: (clk) => ({
		params: { projectId: String(clk.project.id) }
	}),
	target: getTasksProjectFx.start
})

sample({
	clock: getTasksProjectFx.finished.success,
	fn: (clock) => clock.result.data,
	target: $tasks
})

sample({
	clock: getTasksProjectFx.finished.failure,
	fn: () =>
		notifyError({
			title: 'Ошибка',
			message: 'Ошибка при получении задач'
		})
})
