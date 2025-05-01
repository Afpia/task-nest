import { sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { getUserInfo } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { privateRouteOpened } from '@shared/config'
import { notifyError } from '@shared/helpers'

import { $user } from './store'

export const getUserFx = createQuery({
	name: 'getUser',
	handler: () => getUserInfo({ config: {} }),
	enabled: $isAuth
})

sample({
	clock: privateRouteOpened,
	source: $user,
	filter: $user.map((user) => !user.id),
	target: getUserFx.start
})

sample({
	clock: getUserFx.finished.success,
	fn: ({ result }) => result.data,
	target: $user
})

sample({
	clock: getUserFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Пользователь не был получен'
		})
	}
})
