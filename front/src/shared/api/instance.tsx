import axios from 'axios'

export const api = axios.create({
	// baseURL: 'http://localhost:8081/api',
	baseURL: 'http://127.0.0.1:8000/api',
	withCredentials: true
})
