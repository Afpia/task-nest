import { isAxiosError } from 'axios'
import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'
import type { UseFormReturnType } from '@mantine/form'

import { patchUserInfo, patchUserInfoBackground } from '@shared/api'
import { $isAuth } from '@shared/auth'
import { handleError, notifyError, notifySuccess } from '@shared/helpers'
import type { UserFieldPartialData } from '@shared/types'

import { $user, $userLogin } from './store'

export const patchedUser = createEvent<UserFieldPartialData>()
export const patchedUserBackground = createEvent<FormData>()

// FIXME: Проблема с типами формы, прокидываются всегда разные поля
export const updateFormed = createEvent<UseFormReturnType<any, any>>()

export const patchUserFx = createMutation({
	name: 'patchUser',
	handler: (data: UserFieldPartialData) => patchUserInfo({ data }),
	enabled: $isAuth
})

export const patchUserBackgroundFx = createMutation({
	name: 'patchUserBackground',
	handler: (data: FormData) => patchUserInfoBackground({ data }),
	enabled: $isAuth
})

// Обновление пользователя

sample({
	clock: patchedUser,
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
	source: $userLogin,
	fn: (source, clock) => ({ ...source, ...clock.result.data }),
	target: $userLogin
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

// Обновление фона

sample({
	clock: patchedUserBackground,
	fn: (clock) => clock,
	target: patchUserBackgroundFx.start
})

sample({
	clock: patchUserBackgroundFx.finished.success,
	source: $userLogin,
	fn: (source, clock) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Фон успешно обновлен'
		})
		return { ...source, background_url: clock.result.data.background_url }
	},
	target: $userLogin
})

sample({
	clock: patchUserBackgroundFx.finished.failure,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Фон не был обновлен'
		})
	}
})
