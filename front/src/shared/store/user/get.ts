import { redirect } from 'atomic-router'
import { createEvent, sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { getUserInfo, getUserLogin, getUserSearch } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { privateProfileRouteParams, privateRouteOpened, routes } from '@shared/config'
import { notifyError } from '@shared/helpers'

import { $user, $userLogin, $userSearch } from './store'

export const queriedUser = createEvent<string>()
export const clearedUserSearch = createEvent()

$userSearch.reset(clearedUserSearch)

export const getUserFx = createQuery({
	name: 'getUser',
	handler: () => getUserInfo({ config: {} }),
	enabled: $isAuth
})

export const getUserLoginFx = createQuery({
	name: 'getUserLogin',
	handler: (userLogin: string) => getUserLogin({ params: { userLogin } }),
	enabled: $isAuth
})

export const getUserSearchFx = createQuery({
	name: 'getUserSearch',
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
	source: $userLogin,
	filter: (source, clock) => source?.login !== clock.userLogin,
	fn: (_, clk) => clk.userLogin,
	target: getUserLoginFx.start
})

sample({
	clock: getUserLoginFx.finished.success,
	fn: (clock) => clock.result.data,
	target: $userLogin
})

sample({
	clock: getUserLoginFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Текущий пользователь не был получен'
		})
	}
})

// MB: redirect на страницу несуществующего пользователя

redirect({
	clock: getUserLoginFx.finished.failure,
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
