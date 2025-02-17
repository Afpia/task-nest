import { setNavigationProgress } from '@mantine/nprogress'

import { api } from './instance'

api.interceptors.request.use((config) => {
	if (config.url === 'login' || config.url === 'accessUser' || config.url === 'register') {
		// config.onUploadProgress = (progressEvent) => {
		// 	const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 100))
		// 	console.log(percentCompleted, progressEvent)
		// 	// setNavigationProgress(percentCompleted)
		// }
		// setNavigationProgress(80)
		return config
	} else {
		const session = localStorage.getItem('token')
		config.headers.Authorization = `Bearer ${session}`

		config.onUploadProgress = (progressEvent) => {
			const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 100))
			console.log(percentCompleted)
			setNavigationProgress(percentCompleted)
		}

		return config
	}
})

api.interceptors.response.use(
	(response) => {
		// completeNavigationProgress()
		response.config.onDownloadProgress = (event) => {
			const percent = Math.round((event.loaded * 100) / (event.total ?? 100))
			console.log(percent)
		}
		return response
	},
	(error) => Promise.reject(error)
)
