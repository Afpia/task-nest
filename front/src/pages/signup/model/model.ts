import { useNavigate } from 'react-router-dom'
import { createEffect, createStore, sample } from 'effector'

import { notifyError, notifySuccess, routes } from '@shared/config'
import type { UserResponse } from '@shared/types'

import { postUser, postUserAccess } from '../api'

export const $signupErrors = createStore<string | null>(null)
export const $user = createStore<UserResponse | null>(null)

export const signupFx = createEffect(postUser)
export const signupSocialFx = createEffect(postUserAccess)

sample({
	clock: signupFx.doneData,
	fn: (data) => {
		const navigate = useNavigate()
		notifySuccess({
			title: 'Поздравляю',
			message: 'Вы успешно зарегистрировались'
		})
		navigate(routes.MAIN)
		return data
	},
	target: $user
})

sample({
	clock: signupFx.failData,
	fn: (error) => {
		notifyError({
			title: 'Мы не смогли войти в систему',
			message: error.message
		})
		if (error.message === 'Request failed with status code 409') {
			return 'Такого пользователя не существует'
		}
		return 'Непредвиденная ошибка'
	},
	target: $signupErrors
})
