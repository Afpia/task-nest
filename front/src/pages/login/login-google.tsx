import { useEffect, useState } from 'react'
import axios from 'axios'

import { Google } from '@assets/svg/google'
import { Button } from '@mantine/core'

export const LoginGoogle = () => {
	const [loading, setLoading] = useState(false)

	const callback = () => {
		setLoading(true)
		window.location.assign(
			`https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&scope=profile email&redirect_uri=http://localhost:5173/login`
		)
	}

	useEffect(() => {
		const queryHash = window.location.hash
		const params = new URLSearchParams(queryHash.substring(1))

		if (queryHash && params.get('scope')) {
			const accessToken = params.get('access_token')
			window.history.replaceState({}, document.title, window.location.pathname)

			const fetchData = async () => {
				const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
					headers: { Authorization: `Bearer ${accessToken}` }
				})
				console.log(data)
			}
			fetchData()
			setLoading(false)
		}
	}, [])

	// const authGoogle = useGoogleLogin({
	// 	onSuccess: async tokenResponse => {
	// 		// const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
	// 		// 	headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
	// 		// })
	// 		setLoading(false)
	// 		console.log(tokenResponse)
	// 	},
	// 	onError: error => {
	// 		setLoading(false)
	// 		console.log(error)
	// 	},
	// 	onNonOAuthError: () => {
	// 		setLoading(false)
	// 	}
	// })

	// const handleLogin = () => {
	// 	setLoading(true)
	// 	authGoogle()
	// }

	return (
		<Button w={120} variant='outline' color='pink' size='lg' radius='lg' onClick={callback} h={50} loading={loading}>
			<Google width={30} height={30} />
		</Button>
	)
}
