import { redirect } from 'atomic-router'
import { sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { getCurrentProject, getProjectsStats, getProjectsWorkspace, getUsersProject } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { privateProjectRouteParams, routes } from '@shared/config'
import { notifyError } from '@shared/helpers'

import { $currentWorkspace, changedWorkspace } from '../workspaces'

import { $currentProject, $projects, $projectsStats, $usersProject } from './store'

export const getProjectsWorkspaceFx = createQuery({
	name: 'getProjectsWorkspace',
	handler: (workspaceId: string) => getProjectsWorkspace({ params: { workspaceId } }),
	enabled: $isAuth
})

export const getCurrentProjectFx = createQuery({
	name: 'getCurrentProject',
	handler: (projectId: string) => getCurrentProject({ params: { projectId } }),
	enabled: $isAuth
})

export const getUsersProjectFx = createQuery({
	name: 'getUsersProject',
	handler: (projectId: string) => getUsersProject({ params: { projectId } }),
	enabled: $isAuth
})

export const getProjectsStatsFx = createQuery({
	name: 'getProjectsStats',
	handler: (workspaceId: string) => getProjectsStats({ params: { workspaceId } }),
	enabled: $isAuth
})

// Получение пользователей проекта

sample({
	clock: privateProjectRouteParams,
	source: $currentProject,
	filter: ({ project }, clock) => project?.id !== Number(clock.projectId),
	fn: (_, clock) => clock.projectId,
	target: getUsersProjectFx.start
})

sample({
	clock: getUsersProjectFx.finished.success,
	fn: (clock) => clock.result.data,
	target: $usersProject
})

// Получение статистики проектов

sample({
	clock: [changedWorkspace, $currentWorkspace],
	source: $currentWorkspace,
	filter: $isAuth,
	fn: (source) => source.id.toString(),
	target: getProjectsStatsFx.start
})

sample({
	clock: getProjectsStatsFx.finished.success,
	fn: ({ result }) => result.data,
	target: $projectsStats
})

// Получение проекта

sample({
	clock: privateProjectRouteParams,
	source: $currentProject,
	filter: ({ project }, { projectId }) => project?.id !== Number(projectId),
	fn: (_, clock) => clock.projectId,
	target: getCurrentProjectFx.start
})

sample({
	clock: getCurrentProjectFx.finished.success,
	fn: ({ result }) => result.data,
	target: $currentProject
})

sample({
	clock: getCurrentProjectFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Текущий проект не был получен'
		})
	}
})

// MB: redirect на страницу несуществующего проекта
redirect({
	clock: getCurrentProjectFx.finished.failure,
	route: routes.private.home
})

// Получение всех проектов

sample({
	clock: [changedWorkspace, $currentWorkspace],
	source: $currentWorkspace,
	filter: $isAuth,
	fn: (source) => source.id.toString(),
	target: getProjectsWorkspaceFx.start
})

sample({
	clock: getProjectsWorkspaceFx.finished.success,
	fn: ({ result }) => result.data,
	target: $projects
})

sample({
	clock: getProjectsWorkspaceFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Текущие проекты не были получены'
		})
	}
})
