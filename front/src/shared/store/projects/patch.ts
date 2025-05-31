import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'

import { putProject } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { notifyError, notifySuccess } from '@shared/helpers'
import type { PutProjectConfig } from '@shared/types'

import { $projects } from './store'

export const putProjected = createEvent<{ id: number; title?: string; status?: string }>()

const patchProjectFx = createMutation({
	name: 'patchProject',
	handler: ({ params, data }: PutProjectConfig) => putProject({ params, data }),
	enabled: $isAuth
})

// Обновление проекта

sample({
	clock: putProjected,
	fn: (clock) => ({
		params: { projectId: String(clock.id) },
		data: { title: clock?.title, status: clock?.status }
	}),
	target: patchProjectFx.start
})

sample({
	clock: patchProjectFx.finished.success,
	source: $projects,
	fn: (source, clock) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Проект успешно обновлен'
		})

		return source.map((item) => (item.id === clock.result.data.id ? clock.result.data : item))
	},
	target: $projects
})

sample({
	clock: patchProjectFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Проект не был обновлен'
		})
	}
})
