import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Github, Google, Yandex } from '@assets/svg'
import { Button } from '@mantine/core'
import { getGithubToken, getGoogleToken, getYandexToken } from '@utils/api/requests/auth'

interface LoginButtonProps {
	type: 'github' | 'yandex' | 'google'
}

export const LoginButton = ({ type }: LoginButtonProps) => {
	const [loading, setLoading] = useState({
		github: false,
		yandex: false,
		google: false
	})

	const callback = async () => {
		setLoading((prev) => ({ ...prev, [type]: true }))
		try {
			if (type === 'github') {
				await getGithubToken()
			} else if (type === 'yandex') {
				await getYandexToken()
			} else {
				await getGoogleToken()
			}
		} finally {
			setLoading((prev) => ({ ...prev, [type]: false }))
		}
	}

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
		<Link to={`http://127.0.0.1:8000/api/auth/${type}/redirect`}>
			<Button w={120} variant='outline' color='pink' size='lg' radius='lg' onClick={callback} h={50} loading={loading[type]}>
				{getIcon()}
			</Button>
		</Link>
	)
}
