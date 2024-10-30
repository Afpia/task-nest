import { Link } from 'react-router-dom'

import video from '@assets/video/login.mp4'
import { LoginButton } from '@entities/login.button'
import { Box, Divider, Flex, Space, Text, Title } from '@mantine/core'
import { routes } from '@shared/config'

import { LoginForm } from './form'

import style from './ui.module.css'

export const Login = () => (
	<Flex>
		<video className={style.video} playsInline src={video} autoPlay loop muted />
		<Flex gap='xs' h='100vh' w='80vw' justify='center' align='center' direction='column'>
			<Flex w='100%' justify='flex-start'>
				<Box ml={200} size='xs'>
					<Title order={1} pb={30} size={30}>
						Войти в TaskNest
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
						<Link to={routes.SIGNUP} className={style.link}>
							Зарегистрироваться
						</Link>
					</Flex>
				</Box>
			</Flex>
		</Flex>
	</Flex>
)
