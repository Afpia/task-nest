import { useRef, useState } from 'react'
import { useUnit } from 'effector-react'

import {
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	FileButton,
	Flex,
	Group,
	Image,
	Input,
	PasswordInput,
	Text,
	TextInput,
	Title
} from '@mantine/core'

import { AvatarChange } from './avatar'
import { Security } from './security'

import styles from './ui.module.css'
import { Lock, Mail, Plus } from 'lucide-react'

export const Profile = () => {
	const [editPersonal, openEditPersonal] = useState(false)

	return (
		<Flex direction='column' gap='20' w='100%' align='center' justify='center'>
			<Container w={650}>
				<AvatarChange />
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
				<Security />
			</Container>
		</Flex>
	)
}
