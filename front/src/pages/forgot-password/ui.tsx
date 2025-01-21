import { Link } from 'atomic-router-react'

import { Anchor, Box, Button, Flex, Text, TextInput, Title } from '@mantine/core'

import { routes } from '@shared/config'

export const ForgotPassword = () => {
	// const [loading, setLoading] = useState(false)

	return (
		<Flex justify='flex-start' w='100%'>
			<Box ml={200} size='xs' w={400}>
				<Title pb={30} size={30} order={1}>
					Забыли пароль?
				</Title>
				<Text pb={15}>
					Введите адрес электронной почты, использованный при регистрации, и мы отправим инструкции для восстановления доступа.
				</Text>
				<Text pb={30}>
					В целях безопасности мы НЕ сохраняем ваш пароль, поэтому вы можете быть уверены, что пароль не будет отправлен по
					электронной почте.
				</Text>
				<TextInput label='Почта' mb={14} radius='md' size='lg' />
				<Flex align='center' gap={20} mt={20}>
					<Button fz={14} h={50} radius='xl' size='lg' type='submit' variant='filled' w={220} color='pink'>
						Отправить инструкции
					</Button>
					<Anchor component={Link} to={routes.auth.login}>
						Назад
					</Anchor>
				</Flex>
			</Box>
		</Flex>
	)
}
