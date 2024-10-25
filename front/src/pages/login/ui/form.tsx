import { useState } from 'react'

import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import { postUser } from '../api'
import type { UserRequest } from '../api/types'
import { auth } from '../model'

export const LoginForm = () => {
	const [loading, setLoading] = useState(false)

	const form = useForm({
		mode: 'controlled',
		initialValues: { password: '', email: '' },
		validate: zodResolver(auth)
	})

	const submit = async (values: UserRequest) => {
		// AuthInterceptors(setLoading, form)
		await postUser({ data: { email: values.email, password: values.password } })
	}

	return (
		<form onSubmit={form.onSubmit((values) => submit(values))}>
			<TextInput {...form.getInputProps('email')} label='Почта' size='lg' radius='md' mb={14} disabled={loading} />
			<PasswordInput {...form.getInputProps('password')} label='Пароль' radius='md' size='lg' disabled={loading} />
			<Button type='submit' mt={28} w={400} variant='filled' color='pink' size='lg' radius='xl' h={50} loading={loading}>
				Войти
			</Button>
		</form>
	)
}
