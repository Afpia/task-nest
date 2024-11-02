import { createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { useRedirect } from '@app/hooks'
import { routes } from '@shared/config'
import type { UserFieldResponse, UserResponse } from '@shared/types'

export const allUserReceived = createEvent<UserResponse>()
export const allUserExpired = createEvent()

export const $user = createStore<UserFieldResponse>({} as UserFieldResponse).reset(allUserExpired)
const $accessToken = createStore<string>('').reset(allUserExpired)

sample({
	clock: allUserReceived,
	fn: (allUser) => allUser.user,
	target: $user
})

sample({
	clock: allUserReceived,
	fn: (allUser) => allUser.access_token,
	target: $accessToken
})

sample({
	clock: allUserExpired,
	fn: () => useRedirect(routes.LOGIN)
})

export const $isAuth = $accessToken.map((token) => !!token)

persist({
	key: 'token',
	store: $accessToken,
	serialize: (state) => state,
	deserialize: (state) => state
})

// persist({
// 	key: 'user',
// 	store: $user,
// 	serialize: (state) => state,
// 	deserialize: (state) => state
// })
// stringify and parse ?
