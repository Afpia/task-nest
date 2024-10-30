import { api } from './instance'

api.interceptors.request.use((config) => {
	if (config.url === '/login' || config.url === '/accessUser') return config

	// const session = localStorage.getItem('session')
	// const { accessToken } = JSON.parse(session!)
	// :TODO: проверка токена
	// config.headers.Authorization = `Bearer ${accessToken}`
	return config
})
