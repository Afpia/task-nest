import { useNavigate } from 'react-router-dom'
import { createEvent, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { routes } from '@shared/config'
import type { UserFieldResponse, UserResponse } from '@shared/types'

const navigate = useNavigate()

export const allUserReceived = createEvent<UserResponse>()
export const allUserExpired = createEvent()

export const $user = createStore<UserFieldResponse>({} as UserFieldResponse).reset(allUserExpired)
const $accessToken = createStore<string>('').reset(allUserExpired)

sample({
	clock: allUserReceived,
	fn: (token) => token.user,
	target: $user
})

sample({
	clock: allUserReceived,
	fn: (token) => token.access_token,
	target: $accessToken
})

sample({
	clock: allUserExpired,
	fn: () => navigate(routes.LOGIN)
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
