import { useState } from 'react'
import { Link } from 'atomic-router-react'

import { LoginButton } from '@entities/login.button'
import { Anchor, Box, Button, CloseButton, Divider, Flex, Space, Text, Title, Transition } from '@mantine/core'
import { routes } from '@shared/config'

import { Form } from './form'

export const SignUp = () => {
	const [opened, setOpened] = useState(false)

	return (
		<>
			{opened && (
				<Flex pos='absolute' top='50px' left='25vw'>
					<CloseButton onClick={() => setOpened(false)} size='xl' />
				</Flex>
			)}
			<Flex w='100%' justify='flex-start'>
				<Box ml={200} size='xs'>
					<Transition mounted={!opened} transition='fade-down' exitDuration={0.1} duration={300} enterDelay={100}>
						{(styles) => (
							<div style={styles}>
								<Title order={1} pb={30} size={30}>
									Создать аккаунт
								</Title>
								<Flex justify='space-between'>
									<LoginButton type='github' variant='gradient' />
									<LoginButton type='yandex' variant='gradient' />
									<LoginButton type='google' variant='gradient' />
								</Flex>
								<Divider my='lg' label='или' labelPosition='center' />
								<Button onClick={() => setOpened(true)} variant='outline' color='pink' size='lg' radius='xl' w={400} h={50}>
									Продолжить с почтой
								</Button>
								<Flex mt={16} justify='center'>
									<Text>Уже есть аккаунт?</Text>
									<Space w='2' />
									<Anchor component={Link} to={routes.auth.login}>
										Войти
									</Anchor>
								</Flex>
							</div>
						)}
					</Transition>

					<Transition
						mounted={opened}
						transition='fade-down'
						duration={300}
						exitDuration={0.1}
						enterDelay={100}
						timingFunction='ease'
					>
						{(styles) => (
							<div style={styles}>
								<Title order={1} pb={30} size={30}>
									Создать аккаунт
								</Title>
								<Form />
								<Flex mt={16} justify='center'>
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
