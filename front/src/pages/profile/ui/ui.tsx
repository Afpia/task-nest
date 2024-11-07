import { useRef, useState } from 'react'
import { useUnit } from 'effector-react'

import { Avatar, Box, Button, FileButton, Flex, Group, Image, Input, Text, TextInput, Title } from '@mantine/core'
import { Dropzone, type FileWithPath } from '@mantine/dropzone'
import { allUserExpired } from '@shared/auth'

import styles from './ui.module.css'

export const Profile = () => {
	const [onExit] = useUnit([allUserExpired])
	const [file, setFile] = useState<FileWithPath[]>([])
	const openRef = useRef<() => void>(null)
	const [editPersonal, openEditPersonal] = useState(false)

	const clearFile = () => {
		setFile([])
	}

	const preview = file.map((first) => {
		const imageUrl = URL.createObjectURL(first)
		return imageUrl
	})

	return (
		<Flex direction='column' gap='20' w='100%' align='center' justify='center'>
			<Box className={styles.root}>
				<Dropzone
					w='100%'
					h='100%'
					multiple={false}
					maxSize={5 * 1024 ** 2}
					openRef={openRef}
					accept={['image/png', 'image/jpeg']}
					p={20}
					onDrop={setFile}
					activateOnClick={false}
				>
					<Flex w='100%' h='100%' align='center' justify='space-between'>
						<Flex align='center' justify='start' gap={20}>
							<Avatar size='85' src={preview[0]} radius='100%' variant='default' />
							<Flex direction='column' align='flex-start' h='100%' justify='center' gap={10}>
								<Text>Фотография профиля</Text>
								<Text>PNG, JPG меньше 5 МБ</Text>
							</Flex>
						</Flex>
						<Group justify='center'>
							<Button style={{ pointerEvents: 'all' }} onClick={() => openRef.current?.()}>
								Выбрать фото
							</Button>
							<Button style={{ pointerEvents: 'all' }} disabled={file.length === 0} color='red' onClick={clearFile}>
								Удалить
							</Button>
						</Group>
					</Flex>
				</Dropzone>
			</Box>
			<Box className={styles.root}>
				<Flex w='100%' justify='space-between' p={20} pb={0}>
					<Title order={3} size={18} fw={600}>
						Персональные данные
					</Title>
					<Button onClick={() => openEditPersonal(!editPersonal)} variant='outline' radius='lg'>
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
							{/* <Box>
								<Title order={4} size={14}>
									Почта
								</Title>
								<Input variant='unstyled' placeholder='' />
							</Box> */}
						</Flex>
					</Flex>
				</Flex>
			</Box>
			<Button onClick={onExit}>Выйти</Button>
		</Flex>
	)
}
