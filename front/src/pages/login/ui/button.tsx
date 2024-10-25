import { useEffect, useState } from 'react'
import { Github, Google, Yandex } from 'src/app/assets/svg'

import { Button } from '@mantine/core'

import { redirect } from '../config'

interface LoginButtonProps {
	type: 'github' | 'yandex' | 'google'
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
			window.location.assign(redirect.github)
		} else if (type === 'yandex') {
			window.location.assign(redirect.yandex)
		} else {
			window.location.assign(redirect.google)
		}
	}

	useEffect(() => {
		const queryHash = window.location.search
		const params = new URLSearchParams(queryHash.substring(1))

		const accessToken = params.get('access_token')
		window.history.replaceState({}, document.title, window.location.pathname)

		if (accessToken) {
			setLoading((prev) => ({ ...prev, [type]: true }))

			setLoading((prev) => ({ ...prev, [type]: false }))
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
