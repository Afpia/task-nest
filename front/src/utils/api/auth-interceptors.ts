import type { Dispatch, SetStateAction } from 'react'
import { isAxiosError } from 'axios'

import type { UseFormReturnType } from '@mantine/form'

import { api } from './instance'

export const AuthInterceptors = <T extends Record<string, string>>(
	loadingSetter: Dispatch<SetStateAction<boolean>>,
	form?: UseFormReturnType<T>
) => {
	// MB: axios вместо api
	api.interceptors.request.use(
		(config) => {
			loadingSetter(true)
			return config
		},
		(error) => {
			loadingSetter(false)
			return Promise.reject(error)
		}
	)

	api.interceptors.response.use(
		(response) => {
			loadingSetter(false)
			console.log(response)
			return response
		},
		(error) => {
			loadingSetter(false)
			if (isAxiosError(error)) {
				console.log(error.config, 'error Axios')
				form?.setErrors({ password: 'Неверный email или пароль' })
			} else if (error instanceof Error) {
				console.log(error.message)
			}
		}
	)
}
