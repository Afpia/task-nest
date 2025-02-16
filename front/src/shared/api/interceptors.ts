import { api } from './instance'

api.interceptors.request.use((config) => {
	if (config.url === 'login' || config.url === 'accessUser' || config.url === 'register') {
		return config
	} else {
		const session = localStorage.getItem('token')
		config.headers.Authorization = `Bearer ${session}`

		return config
	}
})

api.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error)
)
