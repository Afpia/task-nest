import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'

import { postAssignUserToProject, postKickUserFromProject, postProjectWorkspace } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { notifyError, notifySuccess } from '@shared/helpers'
import type { PostAssignUserToProjectConfig, PostKickUserFromProjectConfig, PostProjectWorkspaceConfig } from '@shared/types'

import { $currentWorkspace } from '../workspaces'

import { $currentProject, $projects, $usersProject } from './store'

export const createdProject = createEvent<string>()
export const assignedUserToProject = createEvent<number>()
export const kickedUserFromProject = createEvent<number>()

const postProjectWorkspaceFx = createMutation({
	name: 'postProjectWorkspace',
	handler: ({ params, data }: PostProjectWorkspaceConfig) => postProjectWorkspace({ params, data }),
	enabled: $isAuth
})

const postAssignUserToProjectFx = createMutation({
	name: 'postAssignUserToProject',
	handler: ({ params, data }: PostAssignUserToProjectConfig) => postAssignUserToProject({ params, data }),
	enabled: $isAuth
})

const postKickUserFromProjectFx = createMutation({
	name: 'postKickUserFromProject',
	handler: ({ params, data }: PostKickUserFromProjectConfig) => postKickUserFromProject({ params, data }),
	enabled: $isAuth
})

// Исключение пользователя из проекта

sample({
	clock: kickedUserFromProject,
	source: $currentProject,
	fn: (source, clock) => ({
		params: {
			projectId: source.project.id.toString()
		},
		data: {
			user_id: clock
		}
	}),
	target: postKickUserFromProjectFx.start
})

sample({
	clock: postKickUserFromProjectFx.finished.success,
	source: $usersProject,
	fn: (source, clock) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Пользователь успешно исключен из проекта'
		})
		return [...source.filter((user) => user.id !== Number(clock.result.data.user.id))]
	},
	target: $usersProject
})

sample({
	clock: postKickUserFromProjectFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Пользователь не исключен из проекта'
		})
	}
})

// Приглашение пользователя в проект

sample({
	clock: assignedUserToProject,
	source: $currentProject,
	fn: (source, clock) => ({
		params: {
			projectId: source.project.id.toString()
		},
		data: {
			user_id: clock
		}
	}),
	target: postAssignUserToProjectFx.start
})

sample({
	clock: postAssignUserToProjectFx.finished.success,
	source: $usersProject,
	fn: (source, clock) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Пользователь успешно приглашен в проект'
		})
		return [...source, clock.result.data.user]
	},
	target: $usersProject
})

sample({
	clock: postAssignUserToProjectFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Пользователь не приглашен в проект'
		})
	}
})

// Создание проекта
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
