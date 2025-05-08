import { redirect } from 'atomic-router'
import { createEffect, createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { routes } from '@shared/config'
import { notifySuccess } from '@shared/helpers/notification'
import type { UserResponse } from '@shared/types'

export const allUserReceived = createEvent<UserResponse>()
export const allUserExpired = createEvent()

export const $username = createStore<string>('').reset(allUserExpired)
const $accessToken = createStore<string>('').reset(allUserExpired)

const clearStorageFx = createEffect(() => {
	localStorage.removeItem('token')
	localStorage.removeItem('username')
	localStorage.removeItem('workspace')
})

export const $isAuth = $accessToken.map((token) => !!token)

sample({
	clock: allUserReceived,
	fn: ({ user }) => user.name,
	target: $username
})

sample({
	clock: allUserReceived,
	fn: (allUser) => allUser.access_token,
	target: $accessToken
})

redirect({
	clock: allUserReceived,
	route: routes.private.home
})

// Логика выхода из системы
sample({
	clock: allUserExpired,
	fn: () => {
		notifySuccess({
			title: 'Поздравляю',
			message: 'Вы успешно вышли из системы'
		})
	}
})

sample({
	clock: allUserExpired,
	target: clearStorageFx
})

redirect({
	clock: allUserExpired,
	route: routes.auth.login
})

persist({
	key: 'token',
	store: $accessToken,
	serialize: (state) => state,
	deserialize: (state) => state
})

persist({
	key: 'username',
	store: $username,
	serialize: (state) => state,
	deserialize: (state) => state
})
