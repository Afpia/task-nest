import { chainRoute } from 'atomic-router'
import { createEffect, createStore, sample } from 'effector'
import { persist } from 'effector-storage/local'

import { getUserInfo } from '@shared/api'
import { $user, privateMain } from '@shared/auth'
import { routes } from '@shared/config'

export const currentRoute = routes.private.home
export const $avatar = createStore<string>('')
export const getUserInfoFx = createEffect(() => getUserInfo({ config: { params: { columns: 'avatar_url' } } }))
// getUserInfoFx()

sample({
	source: $user,
	fn: () => ({ config: {} }),
	target: getUserInfoFx
})

// persist({
// 	key: 'avatar',
// 	store: $avatar,
// 	serialize: (state) => state,
// 	deserialize: (state) => state
// })

sample({
	clock: getUserInfoFx.doneData,
	fn: ({ data }) => data.avatar_url,
	target: $avatar
})
