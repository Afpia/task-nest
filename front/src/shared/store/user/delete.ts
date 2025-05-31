import { redirect } from 'atomic-router'
import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'

import { deleteUser } from '@shared/api'
import { $isAuth, allUserExpired } from '@shared/auth'
import { routes } from '@shared/config'
import { notifyError, notifySuccess } from '@shared/helpers'
import type { DeleteUserConfig } from '@shared/types'

export const deletedUser = createEvent<string>()

const deleteUserFx = createMutation({
	name: 'deleteUserFx',
	handler: ({ config, params }: DeleteUserConfig) => deleteUser({ params, config }),
	enabled: $isAuth
})

sample({
	clock: deletedUser,
	fn: (clock) => ({
		params: {
			email: clock
		}
	}),
	target: deleteUserFx.start
})

sample({
	clock: deleteUserFx.finished.success,
	fn: () => {
		notifySuccess({
			title: 'Успешно',
			message: 'Пользователь успешно удален'
		})
	},
	target: allUserExpired
})

redirect({
	clock: deleteUserFx.finished.success,
	replace: true,
	route: routes.auth.login
})

sample({
	clock: deleteUserFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Пользователь не удален'
		})
	}
})
