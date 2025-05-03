import { redirect } from 'atomic-router'
import { createEvent, sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { getUserId, getUserInfo, getUserSearch } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { privateProfileRouteParams, privateRouteOpened, routes } from '@shared/config'
import { notifyError } from '@shared/helpers'

import { $user, $userId, $userSearch } from './store'

export const queriedUser = createEvent<string>()
export const clearedUserSearch = createEvent()

$userSearch.reset(clearedUserSearch)

export const getUserFx = createQuery({
	name: 'getUser',
	handler: () => getUserInfo({ config: {} }),
	enabled: $isAuth
})

export const getUserIdFx = createQuery({
	name: 'getUserId',
	handler: (userId: string) => getUserId({ params: { userId } }),
	enabled: $isAuth
})

export const getUserSearchFx = createQuery({
	name: 'getUserId',
	handler: ({ config }) => getUserSearch({ config }),
	enabled: $isAuth
})

// поиск пользователя

sample({
	clock: queriedUser,
	fn(clock) {
		return {
			config: {
				params: {
					email: clock
				}
			}
		}
	},
	target: getUserSearchFx.start
})

sample({
	clock: getUserSearchFx.finished.success,
	fn: (clock) => {
		if (clock.result.status === 204) return []
		return clock.result.data
	},
	target: $userSearch
})

sample({
	clock: routes.private.search.closed,
	target: clearedUserSearch
})

// Получение пользователя по id

sample({
	clock: privateProfileRouteParams,
	source: $userId,
	filter: (source, clock) => source?.id !== Number(clock.userId),
	fn: (_, clk) => clk.userId,
	target: getUserIdFx.start
})

sample({
	clock: getUserIdFx.finished.success,
	fn: (clock) => clock.result.data,
	target: $userId
})

sample({
	clock: getUserIdFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Текущий пользователь не был получен'
		})
	}
})

// MB: redirect на страницу несуществующего пользователя

redirect({
	clock: getUserIdFx.finished.failure,
	route: routes.private.home
})

// Получение пользователя

sample({
	clock: privateRouteOpened,
	source: $user,
	filter: $user.map((user) => !user.id),
	target: getUserFx.start
})

sample({
	clock: getUserFx.finished.success,
	fn: ({ result }) => result.data,
	target: $user
})

sample({
	clock: getUserFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Пользователь не был получен'
		})
	}
})
