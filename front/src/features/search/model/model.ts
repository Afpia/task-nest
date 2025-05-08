import { createEvent, createStore, sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { $isAuth } from '@shared/auth'

import type { EntitiesResponse } from '../api'
import { getAllEntities } from '../api'

export const $allEntities = createStore<EntitiesResponse[]>([] as EntitiesResponse[])

export const sendedQueryAllEntities = createEvent<string>()

export const clearedAllEntities = createEvent()

$allEntities.reset(clearedAllEntities)

export const getAllEntitiesFx = createQuery({
	name: 'getAllEntities',
	handler: ({ config }) => getAllEntities({ config }),
	enabled: $isAuth
})

sample({
	clock: sendedQueryAllEntities,
	fn: (clock) => ({
		config: {
			params: {
				query: clock
			}
		}
	}),
	target: getAllEntitiesFx.start
})

sample({
	clock: getAllEntitiesFx.finished.success,
	fn: (clock) => {
		if (clock.result.status === 204) return [{ message: 'NotFound' }] as unknown as EntitiesResponse[]
		return clock.result.data
	},
	target: $allEntities
})
