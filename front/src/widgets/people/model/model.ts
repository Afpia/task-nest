import { createStore, sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { getUsersWorkspace } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { $currentWorkspace, postAddUserToWorkspaceFx, postKickUserFromWorkspaceFx } from '@shared/store'
import type { UserFieldResponse } from '@shared/types'

export const $usersWorkspace = createStore<UserFieldResponse[]>([])

export const getUsersWorkspaceFx = createQuery({
	name: 'getUsersWorkspace',
	handler: (workspaceId: string) => getUsersWorkspace({ params: { workspaceId } }),
	enabled: $isAuth
})

sample({
	clock: postAddUserToWorkspaceFx.finished.success,
	source: $usersWorkspace,
	fn: (source, clock) => [...source, clock.result.data.user],
	target: $usersWorkspace
})

sample({
	clock: postKickUserFromWorkspaceFx.finished.success,
	source: $usersWorkspace,
	fn: (source, clock) => source.filter((user) => user.id !== clock.result.data.user.id),
	target: $usersWorkspace
})

sample({
	clock: $currentWorkspace,
	source: $currentWorkspace,
	fn: (source) => source.id.toString(),
	target: getUsersWorkspaceFx.start
})

sample({
	clock: getUsersWorkspaceFx.finished.success,
	fn: (clock) => clock.result.data,
	target: $usersWorkspace
})
