import { createEffect, createStore, sample } from 'effector'

import { getUserInfo } from '@shared/api'
import { privateRouteOpened, routes } from '@shared/config'

export const currentRoute = routes.private.home
export const $avatar = createStore<string>('')
export const getUserInfoFx = createEffect(() => getUserInfo({ config: { params: { columns: 'avatar_url' } } }))

sample({
	clock: [privateRouteOpened],
	source: $avatar,
	filter: $avatar.map((avatar) => !avatar),
	target: getUserInfoFx
})

sample({
	clock: getUserInfoFx.doneData,
	fn: ({ data }) => data.avatar_url,
	target: $avatar
})
