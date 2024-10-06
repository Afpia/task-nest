import { Button, Container, Divider, Flex, Text, Title } from '@mantine/core'
import { ROUTES } from '@utils/constants/ROUTES'
import { Link } from 'react-router-dom'
import { Google } from '@assets/svg/google'
import { LoginForm } from './login-form'

export const Login = () => {
	return (
		<Flex>
			<Flex gap='xs' h={'100vh'} w={'50vw'} justify='center' align='center' direction='column'>
				<Container size='xs'>
					<Title order={1} pb={18}>
						Авторизация в TaskNest
					</Title>
					<Button
						leftSection={<Google width={24} height={24} />}
						w={400}
						variant='outline'
						color='pink'
						size='lg'
						radius='xl'
						h={50}
					>
						Войти с помощью Google
					</Button>
					<Divider my='lg' label='или войти с помощью аккаунта' labelPosition='center' />
					<LoginForm />
					<Text ta='center' pt={12}>
						Ещё нет аккаунта? <Link to={ROUTES.SIGNUP}>Регистрация</Link>
					</Text>
				</Container>
			</Flex>
			<video style={{ width: '50vw', height: '100vh', objectFit: 'cover' }} playsInline src='/login.mp4' autoPlay loop muted />
		</Flex>
	)
}
