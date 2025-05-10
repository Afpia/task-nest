import { Link } from 'atomic-router-react'

import { Anchor, Box, Divider, Flex, Space, Text, Title } from '@mantine/core'

import { LoginButton } from '@entities/login.button'
import { routes } from '@shared/config'

import { LoginForm } from './form'

const Login = () => (
	<Flex justify='flex-start' w='100%'>
		<Box ml={200} size='xs'>
			<Title pb={30} size={30} order={1}>
				Войти в аккаунт
			</Title>
			<Flex justify='space-between'>
				<LoginButton type='github' variant='outline' />
				<LoginButton type='yandex' variant='outline' />
				<LoginButton type='google' variant='outline' />
			</Flex>
			<Divider label='или войти с помощью почты' my='lg' labelPosition='center' />
			<LoginForm />
			<Flex justify='center' mt={16}>
				<Text>Ещё нет аккаунта?</Text>
				<Space w='2' />
				<Anchor component={Link} to={routes.auth.signup}>
					Зарегистрироваться
				</Anchor>
			</Flex>
		</Box>
	</Flex>
)
export default Login
