import { chainRoute, redirect, type RouteInstance, type RouteParams, type RouteParamsAndQuery } from 'atomic-router'
import { createEvent, sample } from 'effector'

import { routes } from '@shared/config'

import { $isAuth } from './auth'

export function privateResetPassword<Params extends RouteParams>(route: RouteInstance<Params>) {
	const checkSessionStarted = createEvent<RouteParamsAndQuery<Params>>()

	const alreadyAuthorized = sample({
		clock: checkSessionStarted,
		filter: $isAuth.map((isAuth) => !isAuth)
	})

	const noToken = sample({
		clock: checkSessionStarted,
		source: route.$query,
		filter: (source) => {
			const token = source.token
			return !token || token.trim() === ''
		}
	})

	const hasToken = sample({
		clock: checkSessionStarted,
		source: route.$query,
		filter: (source) => {
			const token = source.token
			return typeof token === 'string' && token.trim() !== ''
		}
	})

	const forbidden = sample({
		clock: checkSessionStarted,
		filter: $isAuth
	})

	redirect({
		clock: noToken,
		replace: true,
		route: routes.auth.login
	})

	redirect({
		clock: forbidden,
		route: routes.private.home
	})

	return chainRoute({
		route,
		beforeOpen: checkSessionStarted,
		openOn: [alreadyAuthorized, hasToken],
		cancelOn: [forbidden, noToken]
	})
}
