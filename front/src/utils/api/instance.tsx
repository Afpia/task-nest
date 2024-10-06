import { Dispatch, SetStateAction } from 'react'
import axios from 'axios'
import { UseFormReturnType } from '@mantine/form'

export const api = axios.create({
	baseURL: 'http://localhost:8000/api'
})

// TODO: Вынести отдельно interceptors и переименовать

export const setupAxiosInterceptors = <T extends Record<string, string>>(
	loadingSetter: Dispatch<SetStateAction<boolean>>,
	form?: UseFormReturnType<T>
) => {
	api.interceptors.request.use(
		config => {
			loadingSetter(true)
			return config
		},
		error => {
			loadingSetter(false)
			return Promise.reject(error)
		}
	)

	api.interceptors.response.use(
		response => {
			loadingSetter(false)
			console.log(response)
			return response
		},
		error => {
			loadingSetter(false)
			if (axios.isAxiosError(error)) {
				console.log(error, 'error Axios')
				form?.setErrors({ password: 'Неверный email или пароль' })
			} else if (error instanceof Error) {
				console.log(error.message)
			}
		}
	)
}
