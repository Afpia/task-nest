import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUnit } from 'effector-react'

import { useAuth } from '@app/hooks/useAuth'
import { Button, Flex, PasswordInput, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { $signupErrors, $user, signupFx, signupSchema } from '@pages/signup'
import { routes } from '@shared/config'

export const Form = () => {
	const [signup, loading, error, data] = useUnit([signupFx, signupFx.pending, $signupErrors, $user])
	const navigate = useNavigate()
	const { setSession } = useAuth()

	const form = useForm({
		mode: 'controlled',
		initialValues: { name: '', surname: '', password: '', email: '' },
		validate: zodResolver(signupSchema)
	})

	useEffect(() => {
		if (error !== null) {
			form.setErrors({ name: true, surname: true, email: error, password: true })
		}
	}, [error])

	useEffect(() => {
		if (data !== null) {
			setSession({ access_token: data.access_token, user: data.user })
			navigate(routes.MAIN)
		}
	}, [data])

	return (
		<form onSubmit={form.onSubmit((values) => signup({ data: values }))}>
			<Flex justify='space-between' mb={35}>
				<TextInput {...form.getInputProps('name')} label='Имя' size='lg' radius='md' disabled={loading} w={185} />
				<TextInput {...form.getInputProps('surname')} label='Фамилия' size='lg' radius='md' disabled={loading} w={185} />
			</Flex>
			<TextInput {...form.getInputProps('email')} label='Почта' size='lg' radius='md' mb={35} disabled={loading} w={400} />
			<PasswordInput
				{...form.getInputProps('password')}
				label='Пароль'
				radius='md'
				size='lg'
				w={400}
				disabled={loading}
				placeholder='8+ символов'
			/>
			<Button type='submit' mt={28} w={400} variant='filled' color='pink' size='lg' radius='xl' h={50} loading={loading}>
				Создать аккаунт
			</Button>
		</form>
	)
}
