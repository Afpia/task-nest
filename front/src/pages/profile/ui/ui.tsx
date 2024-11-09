import { useRef, useState } from 'react'
import { useUnit } from 'effector-react'

import { Avatar, Box, Button, FileButton, Flex, Group, Image, Input, Text, TextInput, Title } from '@mantine/core'

import { AvatarChange } from './avatar'
import { Security } from './security'

import styles from './ui.module.css'

export const Profile = () => {
	const [editPersonal, openEditPersonal] = useState(false)

	return (
		<Flex direction='column' gap='20' w='100%' align='center' justify='center'>
			<AvatarChange />
			<Box className={styles.root}>
				<Flex w='100%' justify='space-between' p={20} pb={0}>
					<Title order={3} size={18} fw={600}>
						Персональные данные
					</Title>
					<Button radius='md' onClick={() => openEditPersonal(!editPersonal)} variant='outline'>
						Редактировать
					</Button>
				</Flex>
				<Flex w='100%' h='100%' align='center' justify='space-between' p={20}>
					<Flex align='start' h='100%' justify='start' gap={20}>
						<Flex direction='column' gap={20}>
							<Box>
								<Title order={4} size={14} fw={600}>
									Имя
								</Title>
								<Input disabled={!editPersonal} variant='unstyled' placeholder='' />
								{/* <TextInput value={value} onChange={(event) => setValue(event.currentTarget.value)} /> */}
							</Box>
							<Box>
								<Title order={4} size={14}>
									Почта
								</Title>
								<Input disabled={!editPersonal} variant='unstyled' placeholder='' />
							</Box>
						</Flex>
						<Flex direction='column'>
							<Box>
								<Title order={4} size={14} fw={600}>
									Фамилия
								</Title>
								<Input disabled={!editPersonal} variant='unstyled' placeholder='' />
							</Box>
						</Flex>
					</Flex>
				</Flex>
			</Box>
			<Security />
		</Flex>
	)
}
