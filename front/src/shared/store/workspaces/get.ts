import { redirect } from 'atomic-router'
import { createEvent, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { createQuery } from '@farfetched/core'

import { getUserWorkspaces, getWorkspaceRole } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { privateRouteOpened, routes, started } from '@shared/config'
import type { WorkspaceResponse } from '@shared/types'

import { $currentWorkspace, $workspaceRole, $workspaces } from './store'

export const changedWorkspace = createEvent<string>()

export const getUserWorkspacesFx = createQuery({
	name: 'getUserWorkspaces',
	handler: () => getUserWorkspaces({ config: {} }),
	enabled: $isAuth
})

export const getWorkspaceRoleFx = createQuery({
	name: 'getWorkspaceRole',
	handler: (workspaceId: string) => getWorkspaceRole({ params: { workspaceId } }),
	enabled: $isAuth
})

// Получение текущего workspace

sample({
	clock: privateRouteOpened,
	source: $workspaces,
	filter: $workspaces.map((workspaces) => !workspaces.length),
	fn: () => ({ config: {} }),
	target: getUserWorkspacesFx.start
})

sample({
	clock: getUserWorkspacesFx.finished.success,
	fn: ({ result }) => result.data,
	target: $workspaces
})

sample({
	clock: getUserWorkspacesFx.finished.success,
	source: $currentWorkspace,
	fn: (source, { result }) => {
		if (source.id) {
			return source
		} else {
			return result.data[0]
		}
	},
	target: $currentWorkspace
})

persist({
	key: 'workspace',
	store: $currentWorkspace,
	serialize: (state: WorkspaceResponse) => JSON.stringify({ id: state.id, title: state.title, image_url: state.image_url }),
	deserialize: JSON.parse,
	pickup: started
})

// Изменение workspace

sample({
	clock: changedWorkspace,
	source: $workspaces,
	fn: (source, clock) => source.find((item) => item.id.toString() === clock) || source[0],
	target: $currentWorkspace
})

redirect({
	clock: changedWorkspace,
	replace: true,
	route: routes.private.home
})

// Получение роли workspace

sample({
	clock: $currentWorkspace,
	// clock: [changedWorkspace, getUserWorkspacesFx.finished.success],
	// source: $currentWorkspace,
	fn: (source) => source.id.toString(),
	target: getWorkspaceRoleFx.start
})

sample({
	clock: getWorkspaceRoleFx.finished.success,
	fn(clock) {
		return clock.result.data
	},
	target: $workspaceRole
})
