import { isAxiosError } from 'axios'
import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'
import type { UseFormReturnType } from '@mantine/form'

import { patchUserInfo } from '@shared/api'
import { $isAuth, $username } from '@shared/auth'
import { handleError, notifySuccess } from '@shared/helpers'
import type { UserFieldPartialData } from '@shared/types'

import { getUserLoginFx } from './get'
import { $user, $userLogin } from './store'

export const patchUser = createEvent<UserFieldPartialData>()

// FIXME: Проблема с типами формы, прокидываются всегда разные поля
export const updateFormed = createEvent<UseFormReturnType<any, any>>()

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
	clock: patchUserFx.finished.success,
	source: $username,
	filter: (source, clock) => source !== clock.result.data.name,
	fn: (_, clock) => clock.result.data.name,
	target: $username
})

sample({
	clock: patchUserFx.finished.success,
	source: $userLogin,
	fn: (source) => source.login,
	target: getUserLoginFx.refresh
})

sample({
	clock: patchUserFx.finished.failure,
	source: updateFormed,
	fn: (form, { error }) => {
		if (isAxiosError(error)) {
			const errorMessage = error?.response?.data?.message
			if (errorMessage === 'Текущий пароль неверен') {
				handleError(form, 'Текущий пароль неверен', 'Мы не смогли обновить пароль', {
					current_password: 'Текущий пароль неверен',
					password: true
				})
			} else if (errorMessage === 'email уже занят.') {
				handleError(form, 'Почта занята', 'Мы не смогли обновить почту', {
					email: 'Почта уже занята'
				})
			} else {
				handleError(form, 'Что-то пошло не так AxiosError', 'Мы не смогли обновить профиль')
			}
		} else {
			handleError(form, 'Что-то пошло не так Error', 'Ошибка сервера')
		}
	}
})
