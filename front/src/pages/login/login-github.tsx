import { useEffect, useState } from 'react'
import axios from 'axios'

import { Github } from '@assets/svg/github'
import { Button } from '@mantine/core'

export const LoginGithub = () => {
	const [loading, setLoading] = useState(false)

	const callback = () => {
		setLoading(true)
		window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`)
	}

	useEffect(() => {
		const queryString = window.location.search
		// window.history.replaceState({}, document.title, window.location.pathname)
		const params = new URLSearchParams(queryString)

		if (queryString) {
			const code = params.get('code')

			const fetchData = async () => {
				const { data } = await axios.post(
					`https://github.com/login/oauth/access_token?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&client_secret=${import.meta.env.VITE_GITHUB_CLIENT_SECRET}&code=${code}`
				)
				console.log(data)
			}
			fetchData()
			setLoading(false)
		}
	}, [])

	return (
		<Button w={120} variant='outline' color='pink' size='lg' radius='lg' onClick={callback} h={50} loading={loading}>
			<Github width={30} height={30} />
		</Button>
	)
}
