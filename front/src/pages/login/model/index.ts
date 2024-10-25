import { postUserAccess } from '../api'

export const loginModel = async () => {
	const queryHash = window.location.search
	const params = new URLSearchParams(queryHash.substring(1))

	const accessToken = params.get('access_token')
	window.history.replaceState({}, document.title, window.location.pathname)

	const data = await postUserAccess({ data: { accessToken } })
}
