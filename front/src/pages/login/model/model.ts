import { redirect, useNavigate } from 'react-router-dom'
import { createEffect, createEvent, createStore, sample } from 'effector'

import { allUserReceived } from '@app/providers/auth'
import type { UseFormReturnType } from '@mantine/form'
import { notifyError, notifySuccess, routes } from '@shared/config'

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

export const loginFx = createEffect(postUser)
export const loginSocialFx = createEffect(postUserAccess)
export const loginSocialSended = createEvent()

sample({
	clock: loginFx.doneData,
	fn: (data) => {
		notifySuccess({
			title: 'Поздравляю',
			message: 'Вы вошли в систему'
		})
		// useRedirect(routes.MAIN)
		return data
	},
	target: allUserReceived
})

sample({
	clock: loginFx.failData,
	source: loginFormed,
	fn: (form, error) => {
		if (error.message === 'Request failed with status code 401') {
			notifyError({
				title: 'Мы не смогли войти в систему',
				message: 'Такого пользователя не существует'
			})
			form.setErrors({ email: 'Такого пользователя не существует', password: true })
		}
		form.setErrors({ email: true, password: true })
		notifyError({
			title: 'Мы не смогли войти в систему',
			message: error.message
		})
	}
})

sample({
	clock: loginSocialSended,
	fn: () => {
		const queryHash = window.location.search
		const params = new URLSearchParams(queryHash.substring(1))
		const accessToken = params.get('access_token')
		window.history.replaceState({}, document.title, window.location.pathname)
		console.log(accessToken)
		if (accessToken) {
			return { data: { accessToken } as UserSocialRequest }
		}
		return { data: { accessToken: '' } as UserSocialRequest }
	},
	target: loginSocialFx
})
