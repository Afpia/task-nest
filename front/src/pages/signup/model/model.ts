import { redirect } from 'atomic-router'
import { createEffect, createEvent, sample } from 'effector'

import type { UseFormReturnType } from '@mantine/form'
import { allUserReceived } from '@shared/auth'
import { routes } from '@shared/config'
import { notifyError, notifySuccess } from '@shared/notifications'

import { postUser, postUserAccess } from '../api'
import type { UserRequest } from '../api/types'

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
		if (error.message === 'Request failed with status code 409') {
			notifyError({
				title: 'Мы не смогли войти в систему',
				message: 'Такой пользователь уже зарегистрирован'
			})
			form.setErrors({ email: 'Такой пользователь уже зарегистрирован', password: true, name: true, surname: true })
		} else {
			form.setErrors({ name: true, surname: true, email: true, password: true })
			notifyError({
				title: 'Мы не смогли войти в систему',
				message: error.message
			})
		}
	}
})
