import { redirect } from 'atomic-router'
import { AxiosError } from 'axios'
import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'
import type { UseFormReturnType } from '@mantine/form'

import { routes } from '@shared/config'
import { handleError } from '@shared/helpers'
import { notifySuccess } from '@shared/helpers/notification'

import { postPasswordReset, type PostPasswordResetConfig } from '../api'

export const passwordFormed = createEvent<
	UseFormReturnType<
		{
			password: string
			confirmPassword: string
		},
		(values: { password: string; confirmPassword: string }) => {
			password: string
			confirmPassword: string
		}
	>
>()

export const postPasswordResetFx = createMutation({
	name: 'postPasswordReset',
	handler: ({ config, data }: PostPasswordResetConfig) => postPasswordReset({ config, data })
})

sample({
	clock: passwordFormed,
	fn: (clock) => {
		const query = new URLSearchParams(window.location.search)
		const email = query.get('email') || ''
		const token = query.get('token') || ''

		return {
			data: {
				password: clock.values.password,
				email,
				token,
				password_confirmation: clock.values.confirmPassword
			}
		}
	},
	target: postPasswordResetFx.start
})

sample({
	clock: postPasswordResetFx.finished.success,
	fn: () => {
		notifySuccess({
			title: 'Поздравляю',
			message: 'Вы успешно сбросили пароль'
		})
	}
})

redirect({
	clock: postPasswordResetFx.finished.success,
	replace: true,
	route: routes.auth.login
})

sample({
	clock: postPasswordResetFx.finished.failure,
	source: passwordFormed,
	fn: (source, clock) => {
		if (clock.error instanceof AxiosError) {
			const errorMessage = clock?.error?.response?.data?.message

			// if (errorMessage === 'Выбранный email недопустим.') {
			// 	handleError(source, 'Такого пользователя не существует', 'Мы не смогли отправить сообщение на почту', {
			// 		email: 'Такого пользователя не существует'
			// 	})
			// } else {
			if (errorMessage) {
				handleError(source, 'Что-то пошло не так AxiosError', 'Мы не смогли сбросить пароль', {
					password: true,
					confirmPassword: true
				})
			}
		} else {
			handleError(source, 'Что-то пошло не так Error', 'Мы не смогли сбросить пароль', {
				password: true,
				confirmPassword: true
			})
		}
	}
})
