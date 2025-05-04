import { createStore, sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { getUsersWorkspace } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { $currentWorkspace, addedUserToWorkspace } from '@shared/store'
import type { UserFieldResponse } from '@shared/types'

export const $usersWorkspace = createStore<UserFieldResponse[]>([])

export const getUsersWorkspaceFx = createQuery({
	name: 'getUsersWorkspace',
	handler: (workspaceId: string) => getUsersWorkspace({ params: { workspaceId } }),
	enabled: $isAuth
})

sample({
	clock: [$currentWorkspace, addedUserToWorkspace],
	source: $currentWorkspace,
	fn: (source) => source.id.toString(),
	target: getUsersWorkspaceFx.start
})

sample({
	clock: getUsersWorkspaceFx.finished.success,
	fn: (clock) => clock.result.data,
	target: $usersWorkspace
})
