import { chainRoute, redirect, type RouteInstance, type RouteParams, type RouteParamsAndQuery } from 'atomic-router'
import { createEvent, sample } from 'effector'

import { routes } from '@shared/config'

import { $isAuth } from './auth'

export function privateMain<Params extends RouteParams>(route: RouteInstance<Params>) {
	const checkSessionStarted = createEvent<RouteParamsAndQuery<Params>>()

	const authorized = sample({
		clock: checkSessionStarted,
		filter: $isAuth
	})

	console.log(route)
	const unauthorized = sample({
		clock: checkSessionStarted,
		filter: $isAuth.map((isAuth) => !isAuth)
	})

	redirect({
		clock: unauthorized,
		route: routes.auth.login
	})

	return chainRoute({
		route,
		beforeOpen: checkSessionStarted,
		openOn: [authorized],
		cancelOn: [unauthorized]
	})
}
