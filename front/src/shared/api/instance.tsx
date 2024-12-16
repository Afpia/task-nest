import axios from 'axios'

export const api = axios.create({
	baseURL: 'http://localhost:8081/api',
	// baseURL: 'http://back.localhost/api',
	withCredentials: true
})
