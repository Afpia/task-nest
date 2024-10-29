import { useEffect } from 'react'
import { useUnit } from 'effector-react'

import { useAuth } from '@app/hooks/useAuth'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import { auth, loginErrors, loginFx, user } from '../model'

export const LoginForm = () => {
	const [login, loading, error, data] = useUnit([loginFx, loginFx.pending, loginErrors, user])

	const { setSession } = useAuth()

	const form = useForm({
		mode: 'controlled',
		initialValues: { password: '', email: '' },
		validate: zodResolver(auth)
	})

	useEffect(() => {
		if (error !== null) {
			form.setErrors({ email: true, password: error })
		}
	}, [error])

	useEffect(() => {
		if (data !== null) {
			setSession({ isLogin: true, accessToken: data.accessToken, user: data.user })
		}
	}, [data])

	return (
		<form onSubmit={form.onSubmit((values) => login({ data: values }))}>
			<TextInput {...form.getInputProps('email')} label='Почта' size='lg' radius='md' mb={14} disabled={loading} />
			<PasswordInput {...form.getInputProps('password')} label='Пароль' radius='md' size='lg' disabled={loading} />
			<Button type='submit' mt={28} w={400} variant='filled' color='pink' size='lg' radius='xl' h={50} loading={loading}>
				Войти
			</Button>
		</form>
	)
}
