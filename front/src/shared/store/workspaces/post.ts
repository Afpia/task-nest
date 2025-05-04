import { isAxiosError } from 'axios'
import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'
import { notifications } from '@mantine/notifications'

import { postAddUserToWorkspace, postUserWorkspace } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { notifyError, notifySuccess } from '@shared/helpers'
import type { PostAddUserToWorkspaceConfig, PostUserWorkspaceConfig } from '@shared/types'

import { $currentWorkspace, $workspaces } from './store'

export const createdWorkspace = createEvent<string>()
export const addedUserToWorkspace = createEvent<{ user_id: number; workspaceId: string }>()

const postUserWorkspaceFx = createMutation({
	name: 'postWorkspaceWorkspaceFx',
	handler: ({ data }: PostUserWorkspaceConfig) => postUserWorkspace({ data }),
	enabled: $isAuth
})

const postAddUserToWorkspaceFx = createMutation({
	name: 'postAddUserToWorkspace',
	handler: ({ params, data }: PostAddUserToWorkspaceConfig) => postAddUserToWorkspace({ params, data }),
	enabled: $isAuth
})

// Создание workspace

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
	fn: (source, clock) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Workspace успешно создан'
		})
		return [...source, clock.result.data.workspace]
	},
	target: $workspaces
})

sample({
	clock: postUserWorkspaceFx.finished.success,
	fn: (clock) => clock.result.data.workspace,
	target: $currentWorkspace
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

// Добавление юзера на проект

sample({
	clock: addedUserToWorkspace,
	fn: ({ user_id, workspaceId }) => ({
		params: {
			workspaceId
		},
		data: { user_id }
	}),
	target: postAddUserToWorkspaceFx.start
})

sample({
	clock: postAddUserToWorkspaceFx.finished.success,
	source: addedUserToWorkspace,
	fn: (_, clock) => {
		notifySuccess({
			title: 'Успешно',
			message: `Вы успешно добавили ${clock.result.data.user.login} на workspace`
		})
	}
})

sample({
	clock: postAddUserToWorkspaceFx.finished.failure,
	fn: (clock) => {
		if (isAxiosError(clock.error)) {
			if (clock.error.response?.status === 409) {
				return notifications.show({
					withBorder: true,
					color: 'yellow',
					title: 'Упс...',
					message: clock.error.response.data.message
				})
			}
		}
		notifyError({
			title: 'Ошибка',
			message: 'Пользователь не был добавлен'
		})
	}
})
