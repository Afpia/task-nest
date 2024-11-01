import { createEffect, createStore, sample } from 'effector'

import { notifyError, notifySuccess } from '@shared/config'
import type { UserResponse } from '@shared/types'

import { postUser, postUserAccess } from '../api'

export const $signupErrors = createStore<string | null>(null)
export const $user = createStore<UserResponse | null>(null)

export const signupFx = createEffect(postUser)
export const signupSocialFx = createEffect(postUserAccess)

sample({
	clock: signupFx.doneData,
	fn: (data) => {
		notifySuccess({
			title: 'Поздравляю',
			message: 'Вы успешно зарегистрировались'
		})
		return data
	},
	target: $user
})

sample({
	clock: signupFx.failData,
	fn: (error) => {
		console.log(error)
		notifyError({
			title: 'Мы не смогли войти в систему',
			message: error.message
		})
		return 'Такой пользователь уже существует'
	},
	target: $signupErrors
})
