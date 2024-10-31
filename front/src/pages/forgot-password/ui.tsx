import { useState } from 'react'

import { Box, Button, Flex, Text, TextInput, Title } from '@mantine/core'

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
				<Button
					type='submit'
					mt={20}
					w={220}
					variant='filled'
					fz={14}
					color='pink'
					size='lg'
					radius='xl'
					h={50}
					loading={loading}
				>
					Отправить инструкции
				</Button>
			</Box>
		</Flex>
	)
}
