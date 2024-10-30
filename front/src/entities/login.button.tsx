import { useEffect, useState } from 'react'

import { Github, Google, Yandex } from '@app/assets/svg'
import { Button, type ButtonVariant } from '@mantine/core'
import { redirects } from '@shared/config'

interface LoginButtonProps {
	type: 'github' | 'yandex' | 'google'
	variant: ButtonVariant
	loadingProp?: boolean
}

export const LoginButton = ({ type, variant, loadingProp }: LoginButtonProps) => {
	const [loading, setLoading] = useState({
		github: false,
		yandex: false,
		google: false
	})

	const callback = () => {
		setLoading((prev) => ({ ...prev, [type]: true }))

		if (type === 'github') {
			window.location.assign(redirects.github)
		} else if (type === 'yandex') {
			window.location.assign(redirects.yandex)
		} else {
			window.location.assign(redirects.google)
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
		<Button
			w={120}
			variant={variant}
			color='pink'
			size='lg'
			radius='lg'
			onClick={callback}
			h={50}
			loading={loading[type] || loadingProp}
		>
			{getIcon()}
		</Button>
	)
}
