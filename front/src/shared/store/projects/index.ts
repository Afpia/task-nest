import { createEffect, createEvent, createStore, sample } from 'effector'

import { getProjectsWorkspace, postProjectWorkspace } from '@shared/api'
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

// TODO: Сделать без эффекта без обновления (Невозможно, т.к. при обновлении проектов необходимо обновить стор с проектами)

sample({
	clock: postProjectWorkspaceFx.doneData,
	source: $currentWorkspace,
	fn: (source) => source.id,
	target: getProjectsWorkspaceFx
})
