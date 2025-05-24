import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { Anchor, Box, Button, Flex, PasswordInput, Text, Title } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import { routes } from '@shared/config'

import { passwordFormed, PasswordResetScheme, postPasswordResetFx, type PasswordResetSchemeType } from './model'

const ResetPassword = () => {
	const [passwordForm, loadingPassword] = useUnit([passwordFormed, postPasswordResetFx.$pending])

	const form = useForm<PasswordResetSchemeType>({
		mode: 'controlled',
		initialValues: { confirmPassword: '', password: '' },
		validate: zodResolver(PasswordResetScheme)
	})

	const onClickForm = () => {
		passwordForm(form)
	}

	return (
		<Flex justify='flex-start' w='100%'>
			<Box ml={200} size='xs' w={400}>
				<Title pb={30} size={30} order={1}>
					Измените пароль
				</Title>
				<Text pb={15}>В целях безопасности указывайте уникальный пароль, который вы ещё не использовали на нашем сервисе.</Text>
				<Text pb={30}>
					После смены пароля вы сразу сможете войти в личный кабинет. Если ссылка устарела, запросите новую через форму «Забыли
					пароль?».
				</Text>
				<form onSubmit={form.onSubmit(() => onClickForm())}>
					<PasswordInput
						{...form.getInputProps('password')}
						disabled={loadingPassword}
						label='Пароль'
						mb={14}
						radius='md'
						size='lg'
					/>
					<PasswordInput
						{...form.getInputProps('confirmPassword')}
						disabled={loadingPassword}
						label='Подтвердите пароль'
						mb={14}
						radius='md'
						size='lg'
					/>
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
							Изменить пароль
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

export default ResetPassword
