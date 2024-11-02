import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUnit } from 'effector-react'

import { useAuth } from '@app/hooks/useAuth'
import { Anchor, Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { routes } from '@shared/config'

import { $loginErrors, $user, loginFx, LoginScheme } from '../model'

export const LoginForm = () => {
	const [login, loading, error, data] = useUnit([loginFx, loginFx.pending, $loginErrors, $user])
	const navigate = useNavigate()
	const { setSession } = useAuth()

	const form = useForm({
		mode: 'controlled',
		initialValues: { password: '', email: '' },
		validate: zodResolver(LoginScheme)
	})

	useEffect(() => {
		if (error !== null) {
			form.setErrors({ email: error, password: true })
		}
	}, [error])

	useEffect(() => {
		if (data !== null) {
			setSession({ access_token: data.access_token, user: data.user })
			navigate(routes.MAIN)
		}
	}, [data])

	return (
		<form onSubmit={form.onSubmit((values) => login({ data: values }))}>
			<TextInput {...form.getInputProps('email')} label='Почта' size='lg' radius='md' mb={14} disabled={loading} />
			<PasswordInput {...form.getInputProps('password')} label='Пароль' radius='md' size='lg' disabled={loading} />
			<Flex justify='flex-end' mt={10}>
				<Anchor component={Link} to={routes.FORGOT_PASSWORD}>
					Забыли пароль?
				</Anchor>
			</Flex>
			<Button type='submit' mt={28} w={400} variant='filled' color='pink' size='lg' radius='xl' h={50} loading={loading}>
				Войти
			</Button>
		</form>
	)
}
