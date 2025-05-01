import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'

import { patchUserInfo } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { notifyError, notifySuccess } from '@shared/helpers'
import type { UserFieldPartialData } from '@shared/types'

import { $user } from './store'

export const patchUser = createEvent<UserFieldPartialData>()

export const patchUserFx = createMutation({
	name: 'patchUser',
	handler: (data: UserFieldPartialData) => patchUserInfo({ data }),
	enabled: $isAuth
})

sample({
	clock: patchUser,
	fn: (clock) => clock,
	target: patchUserFx.start
})

sample({
	clock: patchUserFx.finished.success,
	fn: ({ result }) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Пользователь успешно обновлен'
		})

		return result.data
	},
	target: $user
})

sample({
	clock: patchUserFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Пользователь не был обновлен'
		})
	}
})
