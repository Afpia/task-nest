import { useState } from 'react'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { Anchor, Box, Button, CloseButton, Divider, Flex, Space, Text, Title, Transition } from '@mantine/core'

import { LoginButton } from '@entities/login.button'
import { routes } from '@shared/config'

import { $accessToken } from '../model'

import { Form } from './form'

export const SignUp = () => {
	const [{ accessToken }] = useUnit([$accessToken])
	const [opened, setOpened] = useState(false)

	return (
		<>
			{opened && (
				<Flex left='25vw' pos='absolute' top='50px'>
					<CloseButton size='xl' onClick={() => setOpened(false)} />
				</Flex>
			)}
			<Flex justify='flex-start' w='100%'>
				<Box ml={200} size='xs'>
					<Transition enterDelay={100} duration={300} exitDuration={0.1} mounted={!opened} transition='fade-down'>
						{(styles) => (
							<div style={styles}>
								<Title pb={30} size={30} order={1}>
									Создать аккаунт
								</Title>
								<Flex justify='space-between'>
									<LoginButton type='github' variant='gradient' disabledProp={!!accessToken} from='signup' />
									<LoginButton type='yandex' variant='gradient' disabledProp={!!accessToken} from='signup' />
									<LoginButton type='google' variant='gradient' disabledProp={!!accessToken} from='signup' />
								</Flex>
								<Divider label='или' my='lg' labelPosition='center' />
								<Button
									h={50}
									radius='xl'
									size='lg'
									variant='outline'
									w={400}
									color='pink'
									loading={!!accessToken}
									onClick={() => setOpened(true)}
								>
									Продолжить с почтой
								</Button>
								<Flex justify='center' mt={16}>
									<Text>Уже есть аккаунт?</Text>
									<Space w='2' />
									<Anchor
										style={{
											pointerEvents: accessToken ? 'none' : undefined,
											opacity: accessToken ? 0.5 : 1
										}}
										component={Link}
										to={routes.auth.login}
									>
										Войти
									</Anchor>
								</Flex>
							</div>
						)}
					</Transition>

					<Transition
						enterDelay={100}
						duration={300}
						exitDuration={0.1}
						mounted={opened}
						timingFunction='ease'
						transition='fade-down'
					>
						{(styles) => (
							<div style={styles}>
								<Title pb={30} size={30} order={1}>
									Создать аккаунт
								</Title>
								<Form />
								<Flex justify='center' mt={16}>
									<Text>Уже есть аккаунт?</Text>
									<Space w='2' />
									<Anchor component={Link} to={routes.auth.login}>
										Войти
									</Anchor>
								</Flex>
							</div>
						)}
					</Transition>
				</Box>
			</Flex>
		</>
	)
}
