import { useState } from 'react'

import { Button, type ButtonVariant } from '@mantine/core'

import { Github, Google, Yandex } from '@app/assets/svg'
import { redirects } from '@shared/config'

interface LoginButtonProps {
	disabledProp?: boolean
	from: 'login' | 'signup'
	loadingProp?: boolean
	type: 'github' | 'google' | 'yandex'
	variant: ButtonVariant
}

export const LoginButton = ({ type, variant, loadingProp, disabledProp, from }: LoginButtonProps) => {
	const [loading, setLoading] = useState({
		github: false,
		yandex: false,
		google: false
	})

	const callback = () => {
		setLoading((prev) => ({ ...prev, [type]: true }))

		if (type === 'github') {
			window.location.assign(`${redirects.github}?from=${from}`)
		} else if (type === 'yandex') {
			window.location.assign(`${redirects.yandex}?from=${from}`)
		} else {
			window.location.assign(`${redirects.google}?from=${from}`)
		}
	}

	const getIcon = () => {
		if (type === 'github') {
			return <Github height={30} width={30} />
		} else if (type === 'yandex') {
			return <Yandex height={30} width={30} />
		} else {
			return <Google height={30} width={30} />
		}
	}

	return (
		<Button
			disabled={disabledProp}
			h={50}
			radius='lg'
			size='lg'
			variant={variant}
			w={120}
			loading={loading[type] || loadingProp}
			onClick={callback}
		>
			{getIcon()}
		</Button>
	)
}
