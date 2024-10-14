import { useState } from 'react'

import { Github, Google, Yandex } from '@assets/svg'
import { Button } from '@mantine/core'
import { AuthInterceptors } from '@utils/api/auth-interceptors'
import { getGithubToken, getGoogleToken, getYandexToken } from '@utils/api/requests/auth'

interface LoginButtonProps {
	type: 'github' | 'yandex' | 'google'
}

export const LoginButton = ({ type }: LoginButtonProps) => {
	const [loading, setLoading] = useState(false)

	const callback = async () => {
		AuthInterceptors(setLoading)
		if (type === 'github') {
			await getGithubToken()
		} else if (type === 'yandex') {
			await getYandexToken()
		} else {
			await getGoogleToken()
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
		<Button w={120} variant='outline' color='pink' size='lg' radius='lg' onClick={callback} h={50} loading={loading}>
			{getIcon()}
		</Button>
	)
}
