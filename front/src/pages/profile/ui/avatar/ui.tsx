import { useRef, useState } from 'react'

import { Avatar, Box, Button, Flex, Group, Text, useMantineTheme } from '@mantine/core'
import { Dropzone, type FileWithPath } from '@mantine/dropzone'

import styles from './ui.module.css'

export const AvatarChange = () => {
	const [file, setFile] = useState<FileWithPath[]>([])
	const openRef = useRef<() => void>(null)
	const theme = useMantineTheme()

	const clearFile = () => {
		setFile([])
	}

	const preview = file.map((first) => {
		const imageUrl = URL.createObjectURL(first)
		return imageUrl
	})

	return (
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
						{/* eslint-disable-next-line style/multiline-ternary */}
						{file.length === 0 ? (
							<Button radius='md' style={{ pointerEvents: 'all' }} onClick={() => openRef.current?.()}>
								Выбрать фото
							</Button>
						) : (
							<Button radius='md' style={{ pointerEvents: 'all' }} className={styles.buttonSave}>
								Сохранить
							</Button>
						)}
						<Button radius='md' style={{ pointerEvents: 'all' }} disabled={file.length === 0} color='red' onClick={clearFile}>
							Удалить
						</Button>
					</Group>
				</Flex>
			</Dropzone>
		</Box>
	)
}
