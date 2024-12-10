import { createEffect, createStore, sample } from 'effector'

import { getUserInfo } from '@shared/api'
import { privateRouteOpened } from '@shared/config'

export const $avatar = createStore<string>('')
export const getUserAvatarFx = createEffect(() => getUserInfo({ config: { params: { columns: 'avatar_url' } } }))

sample({
	clock: privateRouteOpened,
	source: $avatar,
	filter: $avatar.map((avatar) => !avatar),
	target: getUserAvatarFx
})

sample({
	clock: getUserAvatarFx.doneData,
	fn: ({ data }) => data.avatar_url,
	target: $avatar
})
