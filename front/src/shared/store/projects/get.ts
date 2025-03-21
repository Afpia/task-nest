import { sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { getCurrentProject, getProjectsWorkspace } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { privateProjectRouteParams } from '@shared/config'
import { notifyError } from '@shared/helpers'

import { $currentWorkspace, changedWorkspace, getUserWorkspacesFx } from '../workspaces'

import { $currentProject, $projects } from './store'

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

sample({
	clock: privateProjectRouteParams,
	source: $currentProject,
	filter: ({ project }, { projectId }) => project?.id !== Number(projectId),
	fn: (_, clk) => clk.projectId,
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

// Получение всех проектов

sample({
	clock: [changedWorkspace, getUserWorkspacesFx.finished.success],
	source: $currentWorkspace,
	fn: (source) => source.id,
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
