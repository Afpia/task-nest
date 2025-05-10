import { createEvent, createStore, sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { getUsersWorkspace } from '@shared/api'
import { $isAuth } from '@shared/auth'
import {
	$currentWorkspace,
	postAddUserToWorkspaceFx,
	postKickUserFromWorkspaceFx,
	putManageUserInWorkspaceFx
} from '@shared/store'
import type { UserFieldResponse } from '@shared/types'

export const $usersWorkspace = createStore<UserFieldResponse[]>([])
export const changedOrder = createEvent<'asc' | 'desc'>('asc')

export const getUsersWorkspaceFx = createQuery({
	name: 'getUsersWorkspace',
	handler: ({ workspaceId, config }) => getUsersWorkspace({ params: { workspaceId }, config }),
	enabled: $isAuth
})

// Получение юзеров
sample({
	clock: $currentWorkspace,
	source: $currentWorkspace,
	filter: $isAuth,
	fn: (source) => ({
		workspaceId: source.id.toString()
	}),
	target: getUsersWorkspaceFx.start
})

sample({
	clock: getUsersWorkspaceFx.finished.success,
	fn: (clock) => clock.result.data,
	target: $usersWorkspace
})

// Обновление вывода

sample({
	clock: changedOrder,
	source: $currentWorkspace,
	fn: (source, clock) => ({
		workspaceId: source.id.toString(),
		config: {
			params: {
				order: clock
			}
		}
	}),
	target: getUsersWorkspaceFx.refresh
})

// Обновление после манипуляций с юзерами

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
	clock: putManageUserInWorkspaceFx.finished.success,
	source: $usersWorkspace,
	fn: (source, clock) =>
		source.map((user) =>
			user.id === clock.result.data.user.id
				? {
						...user,
						pivot: {
							...user.pivot,
							role: clock.result.data.user.pivot.role
						}
					}
				: user
		),
	target: $usersWorkspace
})
