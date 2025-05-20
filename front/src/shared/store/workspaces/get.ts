import { redirect } from 'atomic-router'
import { createEvent, sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { getUserWorkspaces, getWorkspaceRole } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { privateRouteOpened, routes } from '@shared/config'

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
			const workspace = localStorage.getItem('workspace')
			return JSON.parse(workspace!) ?? result.data[0]
		}
	},
	target: $currentWorkspace
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

$currentWorkspace.watch((workspace) => {
	if (!(Object.keys(workspace).length === 0)) {
		try {
			const serialized = JSON.stringify(workspace)
			localStorage.setItem('workspace', serialized)
		} catch (e) {
			console.error('Не могу сохранить workspace', e)
		}
	}
})

// Получение роли workspace

sample({
	clock: $currentWorkspace,
	filter: $isAuth,
	// clock: [changedWorkspace, getUserWorkspacesFx.finished.success],
	// source: $currentWorkspace,
	// filter: $currentWorkspace.map((item) => item.id),
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
