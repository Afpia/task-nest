import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'

import { putManageUserInWorkspace, putWorkspace } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { notifyError, notifySuccess } from '@shared/helpers'
import type { PutManageUserInWorkspaceConfig, PutWorkspaceConfig } from '@shared/types'

import { $currentWorkspace, $workspaces } from './store'

export const managedUserInWorkspace = createEvent<{ user_id: number; role: 'admin' | 'executor' | 'project_manager' }>()
export const updatedWorkspace = createEvent<{ workspaceId: string; title: string; description: string }>()

export const putManageUserInWorkspaceFx = createMutation({
	name: 'putManageUserInWorkspace',
	handler: ({ params, data }: PutManageUserInWorkspaceConfig) => putManageUserInWorkspace({ params, data }),
	enabled: $isAuth
})

export const putWorkspaceFx = createMutation({
	name: 'putWorkspace',
	handler: ({ params, data }: PutWorkspaceConfig) => putWorkspace({ params, data }),
	enabled: $isAuth
})

// Изменение рабочего пространства

sample({
	clock: updatedWorkspace,
	fn: ({ workspaceId, title, description }) => ({
		params: {
			workspaceId
		},
		data: { title, description }
	}),
	target: putWorkspaceFx.start
})

sample({
	clock: putWorkspaceFx.finished.success,
	source: $workspaces,
	fn: (source, clock) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Вы успешно изменили рабочее пространство'
		})
		return source.map((ws) => (ws.id === clock.result.data.id ? { ...ws, ...clock.result.data } : ws))
	},
	target: $workspaces
})

sample({
	clock: putWorkspaceFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Не удалось изменить рабочее пространство'
		})
	}
})

// Изменение роли пользователя в рабочем пространстве
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
