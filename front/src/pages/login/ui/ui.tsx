import { Link } from 'react-router-dom'

import { LoginButton } from '@entities/login.button'
import { Anchor, Box, Divider, Flex, Space, Text, Title } from '@mantine/core'
import { routes } from '@shared/config'

import { LoginForm } from './form'

export const Login = () => (
	<Flex w='100%' justify='flex-start'>
		<Box ml={200} size='xs'>
			<Title order={1} pb={30} size={30}>
				Войти в аккаунт
			</Title>
			<Flex justify='space-between'>
				<LoginButton type='github' variant='outline' />
				<LoginButton type='yandex' variant='outline' />
				<LoginButton type='google' variant='outline' />
			</Flex>
			<Divider my='lg' label='или войти с помощью почты' labelPosition='center' />
			<LoginForm />
			<Flex mt={16} justify='center'>
				<Text>Ещё нет аккаунта?</Text>
				<Space w='2' />
				<Anchor component={Link} to={routes.SIGNUP}>
					Зарегистрироваться
				</Anchor>
			</Flex>
		</Box>
	</Flex>
)
