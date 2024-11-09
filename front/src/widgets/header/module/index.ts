import { chainRoute } from 'atomic-router'
import { createEffect, createStore, sample } from 'effector'

import { getUserInfo } from '@shared/api'
import { privateMain } from '@shared/auth'
import { routes } from '@shared/config'

export const currentRoute = routes.private.home
export const $avatar = createStore<string>('')
export const getUserInfoFx = createEffect(() => getUserInfo({ config: { params: { columns: 'avatar_url' } } }))

chainRoute({
	route: privateMain(currentRoute),
	beforeOpen: getUserInfoFx
})

sample({
	clock: getUserInfoFx.doneData,
	fn: ({ data }) => data.avatar_url,
	target: $avatar
})
