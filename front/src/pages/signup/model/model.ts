import { redirect } from 'atomic-router'
import { AxiosError } from 'axios'
import { createEffect, createEvent, createStore, sample } from 'effector'

import type { UseFormReturnType } from '@mantine/form'

import { allUserReceived } from '@shared/auth'
import { routes } from '@shared/config'
import { handleError } from '@shared/helpers/handle.error'
import { notifyError, notifySuccess } from '@shared/helpers/notification'

import { postUser, postUserAccess } from '../api'
import type { UserRequest, UserSocialRequest } from '../api/types'

export const signupFormed = createEvent<
	UseFormReturnType<
		{
			name: string
			surname: string
			password: string
			email: string
		},
		(values: UserRequest) => {
			name: string
			surname: string
			password: string
			email: string
		}
	>
>()

export const $accessToken = createStore<UserSocialRequest>({ accessToken: '' })

export const signupFx = createEffect(postUser)
export const signupSocialFx = createEffect(postUserAccess)

const currentRoute = routes.auth.signup

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
	clock: $accessToken,
	filter: ({ accessToken }) => !!accessToken,
	target: signupSocialFx.prepend(({ accessToken }: UserSocialRequest) => ({ data: { accessToken } }))
})

redirect({
	clock: signupSocialFx.doneData,
	route: routes.private.home
})

sample({
	clock: signupSocialFx.doneData,
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
	clock: signupSocialFx.failData,
	fn: (clock) => {
		notifyError({
			title: 'Мы не смогли войти в систему',
			message: clock.message
		})
	}
})

sample({
	clock: signupFx.doneData,
	fn: ({ data }) => {
		notifySuccess({
			title: 'Поздравляю',
			message: 'Вы успешно зарегистрировались'
		})
		return data
	},
	target: allUserReceived
})

redirect({
	clock: signupFx.doneData,
	route: routes.private.home
})

sample({
	clock: signupFx.failData,
	source: signupFormed,
	fn: (form, error) => {
		if (error instanceof AxiosError) {
			const errorMessage = error?.response?.data?.message

			if (errorMessage === 'email уже занят.') {
				handleError(form, 'Такой пользователь уже зарегистрирован', 'Мы не смогли войти в систему', {
					email: 'Такой пользователь уже зарегистрирован',
					password: true,
					name: true,
					surname: true
				})
			} else {
				handleError(form, 'Что-то пошло не так AxiosError', 'Мы не смогли войти в систему', {
					email: true,
					password: true,
					name: true,
					surname: true
				})
			}
		} else {
			handleError(form, 'Что-то пошло не так Error', 'Мы не смогли войти в систему', {
				email: true,
				password: true,
				name: true,
				surname: true
			})
		}
	}
})
