import { useEffect, useState } from 'react'
import axios from 'axios'

import { Yandex } from '@assets/svg/yandex'
import { Button } from '@mantine/core'

export const LoginYandex = () => {
	const [loading, setLoading] = useState(false)

	const callback = () => {
		setLoading(true)
		window.location.assign(
			`https://oauth.yandex.ru/authorize?response_type=token&client_id=${import.meta.env.VITE_YANDEX_CLIENT_ID}`
		)
	}

	useEffect(() => {
		const queryHash = window.location.hash
		const params = new URLSearchParams(queryHash.substring(1))

		if (queryHash && params.get('cid')) {
			const accessToken = params.get('access_token')
			window.history.replaceState({}, document.title, window.location.pathname)

			const fetchData = async () => {
				const { data } = await axios.get(`https://login.yandex.ru/info`, {
					params: {
						format: 'json',
						oauth_token: accessToken
					}
				})
				console.log(data)
			}
			fetchData()
			setLoading(false)
		}
	}, [])

	return (
		<Button w={120} variant='outline' color='pink' size='lg' radius='lg' h={50} onClick={callback} loading={loading}>
			<Yandex width={30} height={30} />
		</Button>
	)
}
