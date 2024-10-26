import { useEffect, useState } from 'react'

import { Github, Google, Yandex } from '@assets/svg'
import { Button } from '@mantine/core'
import { api } from '@utils/api/instance'

interface LoginButtonProps {
	type: 'github' | 'yandex' | 'google'
}

const LinkSocial = {
	github: `http://localhost:8000/api/auth/github/redirect`,
	yandex: `http://localhost:8000/api/auth/yandex/redirect`,
	google: `http://localhost:8000/api/auth/google/redirect`
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
		const queryHash = window.location.search
		const params = new URLSearchParams(queryHash.substring(1))

		// if (type === 'yandex') {
		const accessToken = params.get('access_token')
		// window.history.replaceState({}, document.title, window.location.pathname)

		// TODO: вынести в requests
		console.log(queryHash)
		const postData = async () => {
			const { data } = await api.post(`accessUser`, {
				data: {
					accessToken
				}
			})
		}
		postData()
		// setLoading((prev) => ({ ...prev, [type]: false }))
		// } else if (type === 'github') {
		// 	const queryString = window.location.search
		// 	const paramsCode = new URLSearchParams(queryString)
		// 	const code = paramsCode.get('code')
		// 	const fetchData = async () => {
		// 		const { data } = await api.post(``, {
		// 			code
		// 		})
		// 	}
		// 	fetchData()
		// }
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
