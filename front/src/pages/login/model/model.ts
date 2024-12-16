import { redirect } from 'atomic-router'
import { AxiosError } from 'axios'
import { createEffect, createEvent, createStore, type EventCallable, sample } from 'effector'

import type { UseFormReturnType } from '@mantine/form'
import { allUserReceived } from '@shared/auth'
import { routes } from '@shared/config'
import { handleError } from '@shared/handle.error'
import { notifyError, notifySuccess } from '@shared/notifications'

import { postUser, postUserAccess } from '../api'
import type { UserRequest, UserSocialRequest } from '../api/types'

export const loginFormed = createEvent<
	UseFormReturnType<
		{
			password: string
			email: string
		},
		(values: UserRequest) => {
			password: string
			email: string
		}
	>
>()

export const $accessToken = createStore<UserSocialRequest>({ accessToken: '' })

export const loginFx = createEffect(postUser)
export const loginSocialFx = createEffect(postUserAccess)

const currentRoute = routes.auth.login

sample({
	clock: currentRoute.opened,
	fn: () => {
		const queryHash = window.location.search
		const params = new URLSearchParams(queryHash.substring(1))
		const accessToken = params.get('access_token')
		window.history.replaceState({}, document.title, window.location.pathname)
		if (accessToken) {
			return { accessToken } as UserSocialRequest
		}
		return { accessToken: '' } as UserSocialRequest
	},
	target: $accessToken
})

sample({
	clock: loginFx.doneData,
	fn: ({ data }) => {
		notifySuccess({
			title: 'Поздравляю',
			message: 'Вы вошли в систему'
		})
		return data
	},
	target: allUserReceived
})

redirect({
	clock: loginFx.doneData,
	route: routes.private.home
})

sample({
	clock: loginFx.failData,
	source: loginFormed,
	fn: (form, error) => {
		if (error instanceof AxiosError) {
			const errorMessage = error?.response?.data?.message

			if (errorMessage === 'Неверный пароль') {
				handleError(form, 'Неверный пароль', { email: true, password: 'Неверный пароль' })
			} else if (errorMessage === 'Email не найден') {
				handleError(form, 'Такого пользователя не существует', { email: 'Такого пользователя не существует', password: true })
			} else {
				handleError(form, 'Что-то пошло не так AxiosError', { email: true, password: true })
			}
		} else {
			handleError(form, 'Что-то пошло не так Error', { email: true, password: true })
		}
	}
})

sample({
	clock: $accessToken,
	filter: ({ accessToken }) => !!accessToken,
	target: loginSocialFx.prepend(({ accessToken }: UserSocialRequest) => ({ data: { accessToken } }))
})

redirect({
	clock: loginSocialFx.doneData,
	route: routes.private.home
})

sample({
	clock: loginSocialFx.doneData,
	fn: ({ data }) => {
		notifySuccess({
			title: 'Поздравляю',
			message: 'Вы вошли в систему'
		})
		return data
	},
	target: allUserReceived
})

sample({
	clock: loginSocialFx.failData,
	fn: (clock) => {
		notifyError({
			title: 'Мы не смогли войти в систему',
			message: clock.message
		})
	}
})
