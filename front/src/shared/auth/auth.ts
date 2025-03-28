import { redirect } from 'atomic-router'
import { createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { routes } from '@shared/config'
import { notifySuccess } from '@shared/helpers/notification'
import type { UserResponse } from '@shared/types'

export const allUserReceived = createEvent<UserResponse>()
export const allUserExpired = createEvent()

export const $username = createStore<string>('').reset(allUserExpired)
const $accessToken = createStore<string>('').reset(allUserExpired)

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

sample({
	clock: allUserExpired,
	fn: () => {
		notifySuccess({
			title: 'Поздравляю',
			message: 'Вы успешно вышли из системы'
		})
	}
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
