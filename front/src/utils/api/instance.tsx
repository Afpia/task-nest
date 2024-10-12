import axios from 'axios'

export const api = axios.create({
	baseURL: 'http://localhost:8000/api',
	withCredentials: true
})

api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer 123131312`
	return config
})
