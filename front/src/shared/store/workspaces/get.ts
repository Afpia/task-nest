import { redirect } from 'atomic-router'
import { createEvent, sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { getUserWorkspaces } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { privateRouteOpened, routes } from '@shared/config'

import { $currentWorkspace, $workspaces } from './store'

export const changedWorkspace = createEvent<string>()

export const getUserWorkspacesFx = createQuery({
	name: 'getUserAvatar',
	handler: () => getUserWorkspaces({ config: {} }),
	enabled: $isAuth
})

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

// persist({
// 	key: 'workspace',
// 	store: $currentWorkspace,
// 	serialize: (state) => JSON.stringify(state.id),
// 	deserialize: (state) => JSON.parse(state)
// })

sample({
	clock: changedWorkspace,
	source: $workspaces,
	fn: (source, clock) => source.find((item) => item.title === clock) || source[0],
	target: $currentWorkspace
})

redirect({
	clock: changedWorkspace,
	replace: true,
	route: routes.private.home
})
