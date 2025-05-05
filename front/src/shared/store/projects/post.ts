import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'

import { postProjectWorkspace } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { notifyError, notifySuccess } from '@shared/helpers'
import type { PostProjectWorkspaceConfig } from '@shared/types'

import { $currentWorkspace } from '../workspaces'

import { $projects } from './store'

export const createdProject = createEvent<string>()

const postProjectWorkspaceFx = createMutation({
	name: 'postProjectWorkspace',
	handler: ({ params, data }: PostProjectWorkspaceConfig) => postProjectWorkspace({ params, data }),
	enabled: $isAuth
})

sample({
	clock: createdProject,
	source: $currentWorkspace,
	fn: (source, clock) => ({
		params: { workspaceId: source.id.toString() },
		data: { title: clock, start_date: new Date().toISOString().split('T')[0], end_date: new Date().toISOString().split('T')[0] }
	}),
	target: postProjectWorkspaceFx.start
})

sample({
	clock: postProjectWorkspaceFx.finished.success,
	source: $projects,
	fn: (source, clock) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Проект успешно создан'
		})
		return [...source, clock.result.data]
	},
	target: $projects
})

sample({
	clock: postProjectWorkspaceFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Проект не создан'
		})
	}
})
