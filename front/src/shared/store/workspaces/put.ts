import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'

import { putManageUserInWorkspace } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { notifyError, notifySuccess } from '@shared/helpers'
import type { PutManageUserInWorkspaceConfig } from '@shared/types'

import { $currentWorkspace } from './store'

export const managedUserInWorkspace = createEvent<{ user_id: number; role: 'admin' | 'executor' | 'project_manager' }>()

export const putManageUserInWorkspaceFx = createMutation({
	name: 'putManageUserInWorkspace',
	handler: ({ params, data }: PutManageUserInWorkspaceConfig) => putManageUserInWorkspace({ params, data }),
	enabled: $isAuth
})

sample({
	clock: managedUserInWorkspace,
	source: $currentWorkspace,
	fn: (source, { user_id, role }) => ({
		params: {
			workspaceId: source.id.toString()
		},
		data: { user_id, role }
	}),
	target: putManageUserInWorkspaceFx.start
})

sample({
	clock: putManageUserInWorkspaceFx.finished.success,
	fn: (clock) => {
		notifySuccess({
			title: 'Успешно',
			message: `Вы успешно изменили роль ${clock.result.data.user.login}`
		})
	}
})

sample({
	clock: putManageUserInWorkspaceFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Не удалось изменить роль пользователя'
		})
	}
})
