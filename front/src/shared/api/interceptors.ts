import { api } from './instance'

api.interceptors.request.use((config) => {
	if (config.url === 'login' || config.url === 'accessUser' || config.url === 'register') {
		// setNavigationProgress(80)

		return config
	} else {
		const session = localStorage.getItem('token')
		config.headers.Authorization = `Bearer ${session}`
		// setNavigationProgress(80)

		return config
	}
})

api.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error)
)
