import { createEvent, sample } from 'effector'

import { createQuery } from '@farfetched/core'

import type { EntitiesResponse } from '@shared/api'
import { getAllEntities } from '@shared/api'
import { $isAuth } from '@shared/auth'

import { $allEntities } from './store'

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
