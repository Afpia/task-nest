import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { Anchor, Box, Button, Flex, Text, TextInput, Title } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import { routes } from '@shared/config'

import { passwordFormed, PasswordScheme, postPasswordEmailFx, type PasswordSchemeType } from './model'

const ForgotPassword = () => {
	const [passwordForm, loadingPassword] = useUnit([passwordFormed, postPasswordEmailFx.$pending])

	const form = useForm<PasswordSchemeType>({
		mode: 'controlled',
		initialValues: { email: '' },
		validate: zodResolver(PasswordScheme)
	})

	const onClickForm = () => {
		passwordForm(form)
	}

	return (
		<Flex justify='flex-start' w='100%'>
			<Box ml={200} size='xs' w={400}>
				<Title pb={30} size={30} order={1}>
					Забыли пароль?
				</Title>
				<Text pb={15}>
					Введите адрес электронной почты, использованный при регистрации, и мы отправим инструкции для восстановления доступа.
				</Text>
				<Text pb={30}>
					В целях безопасности мы НЕ сохраняем ваш пароль, поэтому вы можете быть уверены, что пароль не будет отправлен по
					электронной почте.
				</Text>
				<form onSubmit={form.onSubmit(() => onClickForm())}>
					<TextInput {...form.getInputProps('email')} disabled={loadingPassword} label='Почта' mb={14} radius='md' size='lg' />
					<Flex align='center' gap={20} mt={20}>
						<Button
							fz={14}
							h={50}
							radius='xl'
							size='lg'
							type='submit'
							variant='filled'
							w={220}
							color='pink'
							loading={loadingPassword}
						>
							Отправить инструкции
						</Button>
						<Anchor
							style={{
								pointerEvents: loadingPassword ? 'none' : undefined,
								opacity: loadingPassword ? 0.5 : 1
							}}
							component={Link}
							to={routes.auth.login}
						>
							Назад
						</Anchor>
					</Flex>
				</form>
			</Box>
		</Flex>
	)
}

export default ForgotPassword
