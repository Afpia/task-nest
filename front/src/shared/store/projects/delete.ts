import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'

import { deleteProject } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { notifyError, notifySuccess } from '@shared/helpers'
import type { DeleteProjectConfig } from '@shared/types'

import { $projects } from './store'

// TODO: Не используется
export const deletedProject = createEvent<{ id: number }>()

const deleteProjectFx = createMutation({
	name: 'deleteProject',
	handler: ({ params }: DeleteProjectConfig) => deleteProject({ params }),
	enabled: $isAuth
})

sample({
	clock: deletedProject,
	fn: (clock) => ({
		params: { projectId: String(clock.id) }
	}),
	target: deleteProjectFx.start
})

sample({
	clock: deleteProjectFx.finished.success,
	source: $projects,
	fn: (source, clock) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Проект успешно удален'
		})
		return source.filter((project) => project.id !== clock.result.data.id)
	},
	target: $projects
})

sample({
	clock: deleteProjectFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Проект не был удален'
		})
	}
})
