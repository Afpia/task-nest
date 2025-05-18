import { AxiosError } from 'axios'
import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'
import type { UseFormReturnType } from '@mantine/form'

import { handleError } from '@shared/helpers'
import { notifySuccess } from '@shared/helpers/notification'

import { postPasswordEmail, type PostPasswordEmailConfig } from '../api'

export const passwordFormed = createEvent<
	UseFormReturnType<
		{
			email: string
		},
		(values: { email: string }) => {
			email: string
		}
	>
>()

export const postPasswordEmailFx = createMutation({
	name: 'postPasswordEmail',
	handler: ({ config, data }: PostPasswordEmailConfig) => postPasswordEmail({ config, data })
})

sample({
	clock: passwordFormed,
	fn: (clock) => ({
		data: {
			email: clock.values.email
		}
	}),
	target: postPasswordEmailFx.start
})

sample({
	clock: postPasswordEmailFx.finished.success,
	source: passwordFormed,
	fn: (source) => {
		notifySuccess({
			title: 'Поздравляю',
			message: `Письмо было отправлено на вашу почту ${source.values.email}`
		})
	}
})

sample({
	clock: postPasswordEmailFx.finished.failure,
	source: passwordFormed,
	fn: (source, clock) => {
		if (clock.error instanceof AxiosError) {
			const errorMessage = clock?.error?.response?.data?.message

			if (errorMessage === 'Выбранный email недопустим.') {
				handleError(source, 'Такого пользователя не существует', 'Мы не смогли отправить сообщение на почту', {
					email: 'Такого пользователя не существует'
				})
			} else {
				handleError(source, 'Что-то пошло не так AxiosError', 'Мы не смогли отправить на сообщение на почту', { email: true })
			}
		} else {
			handleError(source, 'Что-то пошло не так Error', 'Мы не смогли отправить на сообщение на почту', { email: true })
		}
	}
})
