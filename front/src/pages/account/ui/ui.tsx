import { Mail } from 'lucide-react'

import { AccountLayout } from '@app/layouts/account'
import { Box, Button, Divider, Flex, Text, TextInput, Title } from '@mantine/core'

export const Account = () => (
	<AccountLayout>
		<Box w='100%'>
			<Flex w='100%' direction='column'>
				<Title mb={10} order={3} size={14} fw={600}>
					Контактный адрес электронной почты
				</Title>
				<Text size='14px' mb={14}>
					Управление адресом электронной почты учетной записи для восстановления
				</Text>
			</Flex>
			<Flex w='100%'>
				<TextInput
					radius='md'
					w='48%'
					label='Почта'
					leftSection={<Mail />}
					// {...form.getInputProps('email')}
				/>
			</Flex>
			<Divider w='100%' mb={20} mt={20} />
			<Flex w='100%' justify='flex-end'>
				<Button type='submit' radius='lg' bg='rgb(64, 192, 87)'>
					Сохранить
				</Button>
			</Flex>
		</Box>
	</AccountLayout>
)
