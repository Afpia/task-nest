import { api } from './instance'

api.interceptors.request.use((config) => {
	if (config.url === 'login' || config.url === 'accessUser' || config.url === 'register') {
		return config
	} else {
		const session = localStorage.getItem('token')
		const { accessToken } = JSON.parse(session!)
		config.headers.Authorization = `Bearer ${accessToken}`
		return config
	}
})
