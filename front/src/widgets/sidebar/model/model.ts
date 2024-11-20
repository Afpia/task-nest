import { chainRoute } from 'atomic-router'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { $user, allUserExpired, allUserReceived, privateMain } from '@shared/auth'
import { path, routes } from '@shared/config'

import { getUserProjects, getUserWorkspaces, postProjectAdd } from '../api'
import type { PostProjectAddConfig, ProjectsResponse, WorkspaceField, WorkspacesResponse } from '../api/types'

export const $projects = createStore<ProjectsResponse>([] as ProjectsResponse)
export const $workspaces = createStore<WorkspacesResponse>([] as WorkspacesResponse)
export const $currentWorkspace = createStore<WorkspaceField>({} as WorkspaceField).reset(allUserExpired)

export const getUserProjectsFx = createEffect((workspace: string) => getUserProjects({ params: { workspace } }))
export const getUserWorkspacesFx = createEffect(getUserWorkspaces)
getUserWorkspacesFx({ config: {} })
export const postProjectWorkspaceFx = createEffect(({ params, data }: PostProjectAddConfig) => postProjectAdd({ params, data }))

export const changedWorkspace = createEvent<string>()

export const createdProjects = createEvent<string>()

sample({
	clock: getUserWorkspacesFx.doneData,
	fn: ({ data }) => data,
	target: $workspaces
})

sample({
	source: $user,
	fn: () => ({ config: {} }),
	target: getUserWorkspacesFx
})

sample({
	clock: getUserWorkspacesFx.doneData,
	fn: ({ data }) => data[0],
	target: [$currentWorkspace, changedWorkspace]
})

persist({
	key: 'workspace',
	store: $currentWorkspace,
	// clock: changedWorkspace,
	serialize: (state) => JSON.stringify(state),
	deserialize: (state) => JSON.parse(state)
})

// Смена рабочего пространства

sample({
	clock: changedWorkspace,
	source: $workspaces,
	fn: (workspaces, workspace) => workspaces.find((item) => item.id === workspace) || workspaces[0],
	target: $currentWorkspace
})

// Проекты

sample({
	clock: getUserWorkspacesFx.doneData,
	source: $currentWorkspace,
	fn: (workspace) => workspace.id,
	target: getUserProjectsFx
})

sample({
	clock: getUserProjectsFx.doneData,
	fn: ({ data }) => data,
	target: $projects
})

// Создание проекта

sample({
	clock: createdProjects,
	source: $currentWorkspace,
	fn: (source, clock) => ({
		params: { workspace: source.id },
		data: { title: clock }
	}),
	target: postProjectWorkspaceFx
})

// TODO: Сделать без эффекта

sample({
	clock: postProjectWorkspaceFx.doneData,
	source: $currentWorkspace,
	fn: (workspace) => workspace.id,
	target: getUserProjectsFx
})
