import { redirect } from 'react-router-dom'
import { createEffect, createEvent, createStore, sample } from 'effector'

import { useAuth } from '@app/hooks/useAuth'
import { notifications } from '@mantine/notifications'
import { notifyError, notifySuccess, routes } from '@shared/config'
import type { UserResponse } from '@shared/types'

import { postUser, postUserAccess } from '../api'

export const loginModel = async () => {
	// const queryHash = window.location.search
	// const params = new URLSearchParams(queryHash.substring(1))
	// const accessToken = params.get('access_token')
	// window.history.replaceState({}, document.title, window.location.pathname)
	// const $user = createStore({})
	// if (accessToken) {
	// 	const loginFx = createEffect(async () => {
	// 		const data = await postUserAccess({ data: { accessToken } })
	// 		return data
	// 	})
	// }
}

export const loginErrors = createStore<string | null>(null)
export const user = createStore<UserResponse | null>(null)

export const loginFx = createEffect(postUser)
export const loginSocialFx = createEffect(postUserAccess)

sample({
	clock: loginFx.doneData,
	fn: (data) => {
		redirect(routes.MAIN)
		notifySuccess({
			title: 'Поздравляю',
			message: 'Вы вошли в систему'
		})
		return data
	},
	target: user
})

sample({
	clock: loginFx.failData,
	fn: (error) => {
		// :TODO обработка ошибок разных типов
		notifyError({
			title: 'Мы не смогли войти в систему',
			message: error.message
		})
		return 'Неверная почта или пароль'
	},
	target: loginErrors
})
