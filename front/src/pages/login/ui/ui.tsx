import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { Anchor, Box, Divider, Flex, Space, Text, Title } from '@mantine/core'

import { LoginButton } from '@entities/login.button'
import { routes } from '@shared/config'

import { $accessToken } from '../model'

import { LoginForm } from './form'

export const Login = () => {
	const [{ accessToken }] = useUnit([$accessToken])

	return (
		<Flex justify='flex-start' w='100%'>
			<Box ml={200} size='xs'>
				<Title pb={30} size={30} order={1}>
					Войти в аккаунт
				</Title>
				<Flex justify='space-between'>
					<LoginButton type='github' variant='outline' disabledProp={!!accessToken} from='login' />
					<LoginButton type='yandex' variant='outline' disabledProp={!!accessToken} from='login' />
					<LoginButton type='google' variant='outline' disabledProp={!!accessToken} from='login' />
				</Flex>
				<Divider label='или войти с помощью почты' my='lg' labelPosition='center' />
				<LoginForm />
				<Flex justify='center' mt={16}>
					<Text>Ещё нет аккаунта?</Text>
					<Space w='2' />
					<Anchor
						style={{
							pointerEvents: accessToken ? 'none' : undefined,
							opacity: accessToken ? 0.5 : 1
						}}
						component={Link}
						to={routes.auth.signup}
					>
						Зарегистрироваться
					</Anchor>
				</Flex>
			</Box>
		</Flex>
	)
}
