import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'

import { deleteTaskProject } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { notifyError, notifySuccess } from '@shared/helpers'
import type { DeleteTaskProjectConfig } from '@shared/types'

import { $currentProject } from '../projects'

import { getTasksProjectFx } from '.'

export const deletedTaskProject = createEvent<number>()

const deleteTaskProjectFx = createMutation({
	name: 'deleteTask',
	handler: ({ params }: DeleteTaskProjectConfig) => deleteTaskProject({ params }),
	enabled: $isAuth
})

sample({
	clock: deletedTaskProject,
	fn: (clock) => ({
		params: { taskId: String(clock) }
	}),
	target: deleteTaskProjectFx.start
})

sample({
	clock: deleteTaskProjectFx.finished.success,
	source: $currentProject,
	fn: (source) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Задача успешно удалена'
		})

		return {
			params: { projectId: String(source.project.id) }
		}
	},
	target: getTasksProjectFx
})

sample({
	clock: deleteTaskProjectFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Задача не была удалена'
		})
	}
})
