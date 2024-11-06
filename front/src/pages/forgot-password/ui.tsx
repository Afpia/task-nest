import { useState } from 'react'
import { Link } from 'atomic-router-react'

import { Anchor, Box, Button, Flex, Text, TextInput, Title } from '@mantine/core'
import { routes } from '@shared/config'

export const ForgotPassword = () => {
	const [loading, setLoading] = useState(false)

	return (
		<Flex w='100%' justify='flex-start'>
			<Box ml={200} size='xs' w={400}>
				<Title order={1} pb={30} size={30}>
					Забыли пароль?
				</Title>
				<Text pb={15}>
					Введите адрес электронной почты, использованный при регистрации, и мы отправим инструкции для восстановления доступа.
				</Text>
				<Text pb={30}>
					В целях безопасности мы НЕ сохраняем ваш пароль, поэтому вы можете быть уверены, что пароль не будет отправлен по
					электронной почте.
				</Text>
				<TextInput label='Почта' size='lg' radius='md' mb={14} disabled={loading} />
				<Flex align='center' mt={20} gap={20}>
					<Button type='submit' w={220} variant='filled' fz={14} color='pink' size='lg' radius='xl' h={50} loading={loading}>
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
