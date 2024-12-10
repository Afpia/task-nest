import { createEffect, createEvent, createStore, sample } from 'effector'

import { getProjectsWorkspace, postProjectWorkspace } from '@shared/api'
import { notifyError, notifySuccess } from '@shared/notifications'
import type { PostProjectWorkspaceConfig, ProjectsResponse } from '@shared/types'

import { $currentWorkspace, changedWorkspace, getUserWorkspacesFx } from '../workspaces'

export const $projects = createStore<ProjectsResponse>([] as ProjectsResponse)

export const getProjectsWorkspaceFx = createEffect((workspaceId: string) => getProjectsWorkspace({ params: { workspaceId } }))
export const postProjectWorkspaceFx = createEffect(({ params, data }: PostProjectWorkspaceConfig) =>
	postProjectWorkspace({ params, data })
)

export const createdProjects = createEvent<string>()

// Проекты

sample({
	clock: [changedWorkspace, getUserWorkspacesFx.doneData],
	source: $currentWorkspace,
	fn: (source) => source.id,
	target: getProjectsWorkspaceFx
})

sample({
	clock: getProjectsWorkspaceFx.doneData,
	fn: ({ data }) => data,
	target: $projects
})

// Создание проекта

sample({
	clock: createdProjects,
	source: $currentWorkspace,
	fn: (source, clock) => ({
		params: { workspaceId: source.id },
		data: { title: clock }
	}),
	target: postProjectWorkspaceFx
})

sample({
	clock: postProjectWorkspaceFx.doneData,
	source: $projects,
	fn: (source, clock) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Проект успешно создан'
		})
		return [...source, clock.data]
	},
	target: $projects
})

sample({
	clock: postProjectWorkspaceFx.failData,
	source: $projects,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Проект не создан'
		})
	}
})
