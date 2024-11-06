import { useEffect } from 'react'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { Anchor, Button, Flex, PasswordInput, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { routes } from '@shared/config'

import type { UserRequest } from '../api/types'
import { loginFormed, loginFx, LoginScheme, loginSocialSended } from '../model'

export const LoginForm = () => {
	const [login, loading, loginError, accessToken] = useUnit([loginFx, loginFx.pending, loginFormed, loginSocialSended])

	const form = useForm({
		mode: 'controlled',
		initialValues: { password: '', email: '' },
		validate: zodResolver(LoginScheme)
	})

	const onClickForm = (values: UserRequest) => {
		loginError(form)
		login({ data: values })
	}

	useEffect(() => {
		accessToken()
	}, [])

	return (
		<form onSubmit={form.onSubmit((values) => onClickForm(values))}>
			<TextInput {...form.getInputProps('email')} label='Почта' size='lg' radius='md' mb={14} disabled={loading} />
			<PasswordInput {...form.getInputProps('password')} label='Пароль' radius='md' size='lg' disabled={loading} />
			<Flex justify='flex-end' mt={10}>
				<Anchor component={Link} to={routes.auth.forgotPassword}>
					Забыли пароль?
				</Anchor>
			</Flex>
			<Button type='submit' mt={28} w={400} variant='filled' color='pink' size='lg' radius='xl' h={50} loading={loading}>
				Войти
			</Button>
		</form>
	)
}
