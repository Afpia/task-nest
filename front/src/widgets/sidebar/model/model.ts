import { createEffect, createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { getUserProjects } from '@shared/api'
import { $user, allUserExpired } from '@shared/auth'
import { privateRouteOpened } from '@shared/config'
import type { ProjectsResponse } from '@shared/types'

import { getUserWorkspaces, postProjectAdd } from '../api'
import type { PostProjectAddConfig, WorkspaceField, WorkspacesResponse } from '../api/types'

export const $projects = createStore<ProjectsResponse>([] as ProjectsResponse)
export const $workspaces = createStore<WorkspacesResponse>([] as WorkspacesResponse).reset(allUserExpired)
export const $currentWorkspace = createStore<WorkspaceField>({} as WorkspaceField).reset(allUserExpired)

export const getUserProjectsFx = createEffect((workspace: string) => getUserProjects({ params: { workspace } }))
export const getUserWorkspacesFx = createEffect(getUserWorkspaces)
export const postProjectWorkspaceFx = createEffect(({ params, data }: PostProjectAddConfig) => postProjectAdd({ params, data }))

export const changedWorkspace = createEvent<string>()
export const createdProjects = createEvent<string>()

sample({
	clock: [privateRouteOpened],
	source: $workspaces,
	filter: $workspaces.map((workspaces) => !workspaces.length),
	fn: () => ({ config: {} }),
	target: getUserWorkspacesFx
})

sample({
	clock: getUserWorkspacesFx.doneData,
	fn: ({ data }) => data,
	target: $workspaces
})

sample({
	clock: getUserWorkspacesFx.doneData,
	source: $currentWorkspace,
	fn: (source, { data }) => {
		if (source.id) {
			return source
		} else {
			return data[0]
		}
	},
	target: $currentWorkspace
})

persist({
	key: 'workspace',
	store: $currentWorkspace,
	serialize: (state) => JSON.stringify(state),
	deserialize: (state) => JSON.parse(state)
})

// Смена рабочего пространства

sample({
	clock: changedWorkspace,
	source: $workspaces,
	fn: (source, clock) => source.find((item) => item.title === clock) || source[0],
	target: $currentWorkspace
})

$workspaces.watch(console.log)
// Проекты

sample({
	clock: [changedWorkspace, getUserWorkspacesFx.doneData],
	source: $currentWorkspace,
	fn: (source) => source.id,
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

// TODO: Сделать без эффекта без обновления

sample({
	clock: postProjectWorkspaceFx.doneData,
	source: $currentWorkspace,
	fn: (workspace) => workspace.id,
	target: getUserProjectsFx
})
