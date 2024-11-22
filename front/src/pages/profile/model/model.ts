import { chainRoute } from 'atomic-router'
import { createEffect, createStore, sample } from 'effector'

import { getUserInfo } from '@shared/api'
import { privateMain } from '@shared/auth'
import { routes } from '@shared/config'
import type { UserFieldResponse } from '@shared/types'

export const $avatar = createStore<string>('')
export const $user = createStore({} as Pick<UserFieldResponse, 'email' | 'name'>)
export const getUserInfoFx = createEffect(() => getUserInfo({ config: {} }))
export const currentRoute = routes.private.profile

chainRoute({
	route: privateMain(currentRoute),
	beforeOpen: {
		effect: getUserInfoFx,
		mapParams: ({ params, query }) => ({
			data: undefined,
			config: {
				params,
				...query
			}
		})
	}
})

sample({
	clock: getUserInfoFx.doneData,
	fn: ({ data }) => data.avatar_url,
	target: $avatar
})

sample({
	clock: getUserInfoFx.doneData,
	fn: ({ data }) => ({
		name: data.name,
		email: data.email
	}),
	target: $user
})
