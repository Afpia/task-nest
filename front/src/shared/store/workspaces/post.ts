import { redirect } from 'atomic-router'
import { isAxiosError } from 'axios'
import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'
import { notifications } from '@mantine/notifications'

import { postAddUserToWorkspace, postKickUserFromWorkspace, postUserWorkspace } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { routes } from '@shared/config'
import { notifyError, notifySuccess } from '@shared/helpers'
import type { PostAddUserToWorkspaceConfig, PostKickUserFromWorkspaceConfig } from '@shared/types'

import { $currentWorkspace, $workspaces } from './store'

export const createdWorkspace = createEvent<FormData>()
export const addedUserToWorkspace = createEvent<{ user_id: number; workspaceId: string }>()
export const kickedUserFromWorkspace = createEvent<{ user_id: number }>()

const postUserWorkspaceFx = createMutation({
	name: 'postWorkspaceWorkspaceFx',
	handler: (data: FormData) => postUserWorkspace({ data }),
	enabled: $isAuth
})

// NOTE: Нужен для обновление widget people
export const postAddUserToWorkspaceFx = createMutation({
	name: 'postAddUserToWorkspace',
	handler: ({ params, data }: PostAddUserToWorkspaceConfig) => postAddUserToWorkspace({ params, data }),
	enabled: $isAuth
})

export const postKickUserFromWorkspaceFx = createMutation({
	name: 'postKickUserFromWorkspace',
	handler: ({ params, data }: PostKickUserFromWorkspaceConfig) => postKickUserFromWorkspace({ params, data }),
	enabled: $isAuth
})

// Создание workspace

sample({
	clock: createdWorkspace,
	fn: (clock) => clock,
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

redirect({
	clock: postUserWorkspaceFx.finished.success,
	replace: true,
	route: routes.private.home
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

// Добавление юзера на workspace

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

// Удаление юзера с workspace

sample({
	clock: kickedUserFromWorkspace,
	source: $currentWorkspace,
	fn: (source, { user_id }) => ({
		params: {
			workspaceId: source.id.toString()
		},
		data: { user_id }
	}),
	target: postKickUserFromWorkspaceFx.start
})

sample({
	clock: postKickUserFromWorkspaceFx.finished.success,
	fn: (clock) => {
		notifySuccess({
			title: 'Успешно',
			message: `Вы успешно удалили ${clock.result.data.user.login} с workspace`
		})
	}
})

sample({
	clock: postKickUserFromWorkspaceFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Пользователь не был удален'
		})
	}
})
