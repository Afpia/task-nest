import { useUnit } from 'effector-react'
import { Lock, Mail, Plus } from 'lucide-react'

import { Box, Button, Divider, Flex, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { $user } from '@pages/profile/model'

export const Personal = () => {
	const [userInfo] = useUnit([$user])

	return (
		<>
			<Box>
				<Flex w='100%' justify='space-between'>
					<Title mb={10} order={3} size={14} fw={600}>
						Полное имя
					</Title>
				</Flex>
				<Flex w='100%' align='start' h='100%' justify='start' gap={20}>
					<TextInput radius='md' w='48%' label='Имя' />
					<TextInput radius='md' w='48%' variant='default' label='Фамилия' />
				</Flex>
			</Box>
			<Divider w='100%' mb={20} mt={20} />
			<Box>
				<Flex w='100%' direction='column'>
					<Title mb={10} order={3} size={14} fw={600}>
						Контактный адрес электронной почты
					</Title>
					<Text size='14px' mb={14}>
						Управление адресом электронной почты учетной записи для восстановления
					</Text>
				</Flex>
				<Flex w='100%' align='flex-end' h='100%' justify='space-between' gap={20}>
					<TextInput radius='md' w='48%' label='Почта' leftSection={<Mail />} />
					<Button radius='md' leftSection={<Plus />}>
						Добавить другую почту
					</Button>
				</Flex>
			</Box>
			<Divider w='100%' mb={20} mt={20} />
			<Box>
				<Flex w='100%' direction='column'>
					<Title mb={10} order={3} size={14} fw={600}>
						Пароль
					</Title>
					<Text size='14px' mb={14}>
						Изменение текущего пароля
					</Text>
				</Flex>
				<Flex w='100%' align='start' h='100%' justify='start' gap={20}>
					<PasswordInput label='Текущий пароль' radius='md' w='48%' leftSection={<Lock />} />
					<PasswordInput label='Новый пароль' radius='md' w='48%' leftSection={<Lock />} />
				</Flex>
			</Box>
			<Divider w='100%' mb={20} mt={20} />
		</>
	)
}
