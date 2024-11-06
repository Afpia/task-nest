import { createEffect, createEvent, createStore, sample } from 'effector'

import { getUserInfo } from '@shared/api'
import { $user } from '@shared/auth'

export const $avatar = createStore<string>('')
export const getUserInfoFx = createEffect(() => getUserInfo({ config: { params: { columns: 'avatar_url' } } }))

sample({
	clock: getUserInfoFx.doneData,
	fn: ({ data }) => data.avatar_url,
	target: $avatar
})

// sample({
// 	clock: $user.updates,
// 	target: getUserInfoFx
// })
