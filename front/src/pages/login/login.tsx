import video from '@assets/video/login.mp4'
import { Container, Divider, Flex, Title } from '@mantine/core'

import { LoginForm } from './login-form'
import { LoginGithub } from './login-github'
import { LoginGoogle } from './login-google'
import { LoginYandex } from './login-yandex'

export const Login = () => (
	<Flex>
		<Flex gap='xs' h='100vh' w='50vw' justify='center' align='center' direction='column'>
			<Container size='xs'>
				<Title order={1} pb={26}>
					Регистрация в TaskNest
				</Title>
				<Flex justify='space-between'>
					<LoginGithub />
					<LoginYandex />
					<LoginGoogle />
				</Flex>
				<Divider my='lg' label='или войти с помощью аккаунта' labelPosition='center' />
				<LoginForm />
				{/* <Text ta='center' pt={12}>
						Ещё нет аккаунта? <Link to={ROUTES.SIGNUP}>Регистрация</Link>
					</Text> */}
			</Container>
		</Flex>
		<video style={{ width: '50vw', height: '100vh', objectFit: 'cover' }} playsInline src={video} autoPlay loop muted />
	</Flex>
)
