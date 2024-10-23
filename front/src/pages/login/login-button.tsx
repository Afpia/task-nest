import { useEffect, useState } from 'react'

import { Github, Google, Yandex } from '@assets/svg'
import { Button } from '@mantine/core'
import { api } from '@utils/api/instance'
import { getGithubToken, getGoogleToken, getYandexToken } from '@utils/api/requests/auth'

interface LoginButtonProps {
	type: 'github' | 'yandex' | 'google'
}

const LinkSocial = {
	github: `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`,
	yandex: `https://oauth.yandex.ru/authorize?response_type=token&client_id=${import.meta.env.VITE_YANDEX_CLIENT_ID}`,
	google: `https://accounts.google.com/o/oauth2/v2/auth?response_type=token&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&scope=profile email&redirect_uri=http://localhost:5173/login`
}

export const LoginButton = ({ type }: LoginButtonProps) => {
	const [loading, setLoading] = useState({
		github: false,
		yandex: false,
		google: false
	})

	const callback = () => {
		setLoading((prev) => ({ ...prev, [type]: true }))

		if (type === 'github') {
			window.location.assign(LinkSocial.github)
		} else if (type === 'yandex') {
			window.location.assign(LinkSocial.yandex)
		} else {
			window.location.assign(LinkSocial.google)
		}
	}

	useEffect(() => {
		const queryHash = window.location.hash
		const params = new URLSearchParams(queryHash.substring(1))

		if (type === 'yandex') {
			const accessToken = params.get('access_token')
			// window.history.replaceState({}, document.title, window.location.pathname)

			// TODO: вынести в requests
			const postData = async () => {
				const { data } = await api.post(``, {
					data: {
						accessToken
					}
				})
			}
			postData()
			// setLoading((prev) => ({ ...prev, [type]: false }))
		} else if (type === 'github') {
			const queryString = window.location.search
			const paramsCode = new URLSearchParams(queryString)
			const code = paramsCode.get('code')
			const fetchData = async () => {
				const { data } = await api.post(``, {
					code
				})
			}
			fetchData()
		}
	}, [])

	const getIcon = () => {
		if (type === 'github') {
			return <Github width={30} height={30} />
		} else if (type === 'yandex') {
			return <Yandex width={30} height={30} />
		} else {
			return <Google width={30} height={30} />
		}
	}

	return (
		<Button w={120} variant='outline' color='pink' size='lg' radius='lg' onClick={callback} h={50} loading={loading[type]}>
			{getIcon()}
		</Button>
	)
}
