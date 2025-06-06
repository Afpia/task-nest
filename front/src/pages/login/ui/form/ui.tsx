import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { Anchor, Button, Flex, PasswordInput, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import type { UserRequest } from '@pages/login/api/types'
import { $accessToken, loginFormed, loginFx, LoginScheme } from '@pages/login/model'
import { routes } from '@shared/config'

export const LoginForm = () => {
	const [login, loading, loginError, { accessToken }] = useUnit([loginFx, loginFx.pending, loginFormed, $accessToken])

	const form = useForm({
		mode: 'controlled',
		initialValues: { password: '', email: '' },
		validate: zodResolver(LoginScheme)
	})

	const onClickForm = (values: UserRequest) => {
		loginError(form)
		login({
			data: values,
			config: {
				onDownloadProgress(progressEvent) {
					const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 100))
					console.log(percentCompleted, progressEvent)
				}
			}
		})
	}

	return (
		<form onSubmit={form.onSubmit((values) => onClickForm(values))}>
			<TextInput
				{...form.getInputProps('email')}
				disabled={loading || !!accessToken}
				label='Почта'
				mb={14}
				radius='md'
				size='lg'
			/>
			<PasswordInput
				{...form.getInputProps('password')}
				disabled={loading || !!accessToken}
				label='Пароль'
				radius='md'
				size='lg'
			/>
			<Flex justify='flex-end' mt={10}>
				<Anchor
					style={{
						pointerEvents: accessToken ? 'none' : undefined,
						opacity: accessToken ? 0.5 : 1
					}}
					component={Link}
					to={routes.auth.forgotPassword}
				>
					Забыли пароль?
				</Anchor>
			</Flex>
			<Button
				h={50}
				mt={28}
				radius='xl'
				size='lg'
				type='submit'
				variant='filled'
				w={400}
				color='pink'
				loading={loading || !!accessToken}
			>
				Войти
			</Button>
		</form>
	)
}
