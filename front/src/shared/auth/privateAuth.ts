import { chainRoute, redirect, type RouteInstance, type RouteParams, type RouteParamsAndQuery } from 'atomic-router'
import { createEvent, sample } from 'effector'

import { routes } from '@shared/config'

import { $isAuth } from './auth'

export function privateAuth<Params extends RouteParams>(route: RouteInstance<Params>) {
	const checkSessionStarted = createEvent<RouteParamsAndQuery<Params>>()

	const alreadyAuthorized = sample({
		clock: checkSessionStarted,
		filter: $isAuth.map((isAuth) => isAuth)
	})

	const forbidden = sample({
		clock: checkSessionStarted,
		filter: $isAuth
	})
	console.log(forbidden)
	redirect({
		clock: forbidden,
		route: routes.private.home
	})

	return chainRoute({
		route,
		beforeOpen: checkSessionStarted,
		openOn: [alreadyAuthorized],
		cancelOn: [forbidden]
	})
}
