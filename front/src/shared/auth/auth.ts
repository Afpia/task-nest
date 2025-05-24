import { redirect } from 'atomic-router'
import { createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { routes } from '@shared/config'
import { notifySuccess } from '@shared/helpers/notification'
import type { UserResponse } from '@shared/types'

export const allUserReceived = createEvent<UserResponse>()
export const allUserExpired = createEvent()

const $accessToken = createStore<string>('').reset(allUserExpired)

export const $isAuth = $accessToken.map((token) => !!token)

sample({
	clock: allUserReceived,
	fn: (clock) => clock.access_token,
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
		localStorage.removeItem('token')
		localStorage.removeItem('workspace')
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
	// pickup: started,
	serialize: (state) => state,
	deserialize: (state) => state
})
