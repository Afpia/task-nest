import { useState } from 'react'
import { Link } from 'react-router-dom'

import video from '@assets/video/login.mp4'
import { LoginButton } from '@entities/login.button'
import { Box, Button, Divider, Flex, Space, Text, Title, Transition } from '@mantine/core'
import { routes } from '@shared/config'

import style from './ui.module.css'

export const SignUp = () => {
	const [opened, setOpened] = useState(false)

	return (
		<Flex>
			<video className={style.video} playsInline src={video} autoPlay loop muted />
			<Flex gap='xs' h='100vh' w='80vw' justify='center' align='center' direction='column'>
				<Flex w='100%' justify='flex-start'>
					<Box ml={200} size='xs'>
						<Title order={1} pb={30} size={30}>
							Создать аккаунт в TaskNest
						</Title>
						<Flex justify='space-between'>
							<LoginButton type='github' variant='filled' />
							<LoginButton type='yandex' variant='filled' />
							<LoginButton type='google' variant='filled' />
						</Flex>
						<Divider my='lg' label='или' labelPosition='center' />
						<Button
							onClick={() => setOpened((prev) => !prev)}
							variant='outline'
							color='pink'
							size='lg'
							radius='xl'
							w={400}
							h={50}
						>
							Продолжить с почтой
						</Button>
						<Transition mounted={opened} transition='fade' duration={400} timingFunction='ease'>
							{(styles) => <div style={styles}>Your modal</div>}
						</Transition>
						<Flex mt={16} justify='center'>
							<Text>Уже есть аккаунт?</Text>
							<Space w='2' />
							<Link to={routes.LOGIN} className={style.link}>
								Войти
							</Link>
						</Flex>
					</Box>
				</Flex>
			</Flex>
		</Flex>
	)
}
