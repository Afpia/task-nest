import { createEvent, createStore, sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { getUsersWorkspace } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { ROLE } from '@shared/config'
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

const roleOrder: Record<string, number> = {
	[ROLE.EXECUTOR]: 0,
	[ROLE.PROJECT_MANAGER]: 1,
	[ROLE.ADMIN]: 2,
	[ROLE.OWNER]: 3
}

sample({
	clock: changedOrder,
	source: $usersWorkspace,
	fn: (source, clock) => {
		if (!source || source.length === 0) return source

		const copy = [...source]

		copy.sort((a, b) => {
			const ra = roleOrder[a.pivot.role] ?? 0
			const rb = roleOrder[b.pivot.role] ?? 0
			if (clock === 'asc') {
				return ra - rb
			} else {
				return rb - ra
			}
		})

		return copy
	},
	target: $usersWorkspace
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
