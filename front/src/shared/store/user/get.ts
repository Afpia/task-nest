import { sample } from 'effector'

import { createQuery } from '@farfetched/core'

import { getUserInfo } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { privateRouteOpened } from '@shared/config'
import { notifyError } from '@shared/helpers'

import { $avatar } from './store'

export const getUserAvatarFx = createQuery({
	name: 'getUserAvatar',
	handler: () => getUserInfo({ config: { params: { columns: 'avatar_url' } } }),
	enabled: $isAuth
})

sample({
	clock: privateRouteOpened,
	source: $avatar,
	filter: $avatar.map((avatar) => !avatar),
	target: getUserAvatarFx.start
})

sample({
	clock: getUserAvatarFx.finished.success,
	fn: ({ result }) => result.data.avatar_url,
	target: $avatar
})

sample({
	clock: getUserAvatarFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Аватарка не была получена'
		})
	}
})
