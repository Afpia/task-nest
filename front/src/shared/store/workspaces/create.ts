import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'

import { postUserWorkspace } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { notifyError, notifySuccess } from '@shared/helpers'
import type { PostUserWorkspaceConfig } from '@shared/types'

import { getUserWorkspacesFx } from './get'
import { $workspaces } from './store'

export const createdWorkspace = createEvent<string>()

const postUserWorkspaceFx = createMutation({
	name: 'postWorkspaceWorkspaceFx',
	handler: ({ data }: PostUserWorkspaceConfig) => postUserWorkspace({ data }),
	enabled: $isAuth
})

sample({
	clock: createdWorkspace,
	fn: (clock) => ({
		data: { title: clock }
	}),
	target: postUserWorkspaceFx.start
})

sample({
	clock: postUserWorkspaceFx.finished.success,
	source: $workspaces,
	fn: () => {
		notifySuccess({
			title: 'Успешно',
			message: 'Workspace успешно создан'
		})
		// return [...source, clock.result.data]
	},
	target: getUserWorkspacesFx.refresh
})

sample({
	clock: postUserWorkspaceFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Workspace не создан'
		})
	}
})
