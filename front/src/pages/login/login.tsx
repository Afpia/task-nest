import video from '@assets/video/login.mp4'
import { Container, Divider, Flex, Title } from '@mantine/core'

import { LoginButton } from './login-button'
import { LoginForm } from './login-form'

export const Login = () => (
	<Flex>
		<Flex gap='xs' h='100vh' w='50vw' justify='center' align='center' direction='column'>
			<Container size='xs'>
				<Title order={1} pb={26}>
					Регистрация в TaskNest
				</Title>
				<Flex justify='space-between'>
					<LoginButton type='github' />
					<LoginButton type='yandex' />
					<LoginButton type='google' />
				</Flex>
				<Divider my='lg' label='или войти с помощью аккаунта' labelPosition='center' />
				<LoginForm />
			</Container>
		</Flex>
		<video style={{ width: '50vw', height: '100vh', objectFit: 'cover' }} playsInline src={video} autoPlay loop muted />
	</Flex>
)
