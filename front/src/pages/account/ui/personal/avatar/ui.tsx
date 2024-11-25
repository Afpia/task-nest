import { useRef, useState } from 'react'

import { Avatar, Button, Flex, Group, Text } from '@mantine/core'
import { Dropzone, type FileWithPath } from '@mantine/dropzone'
import type { UseFormReturnType } from '@mantine/form'

export const AvatarChange = ({
	form
}: {
	form: UseFormReturnType<
		{
			name: string
			surname: string
			avatar: string
			about: string
			pronouns: string
		},
		// eslint-disable-next-line style/member-delimiter-style
		(values: { name: string; surname: string; avatar: string; about: string; pronouns: string }) => {
			name: string
			surname: string
			avatar: string
			about: string
			pronouns: string
		}
	>
}) => {
	const [file, setFile] = useState<FileWithPath[]>([])
	const openRef = useRef<() => void>(null)

	const clearFile = () => {
		setFile([])
	}

	const preview = file.map((first) => {
		const imageUrl = URL.createObjectURL(first)
		return imageUrl
	})

	return (
		<Dropzone
			w='100%'
			multiple={false}
			maxSize={5 * 1024 ** 2}
			bg='default'
			p={20}
			style={{ borderRadius: '10px' }}
			mb={20}
			acceptColor='green'
			rejectColor='red'
			openRef={openRef}
			accept={['image/png', 'image/jpeg']}
			onDrop={setFile}
			activateOnClick={false}
		>
			<Flex w='100%' h='100%' align='center' justify='space-between'>
				<Flex align='center' justify='start' gap={20}>
					<Avatar size='85' src={preview[0] || form.getValues().avatar} radius='100%' variant='default' />
					<Flex direction='column' align='flex-start' h='100%' justify='center' gap={10}>
						<Text>Фотография профиля</Text>
						<Text>PNG, JPG меньше 5 МБ</Text>
					</Flex>
				</Flex>
				<Group justify='center'>
					<Button radius='md' style={{ pointerEvents: 'all' }} onClick={() => openRef.current?.()}>
						Выбрать фото
					</Button>
					<Button radius='md' style={{ pointerEvents: 'all' }} disabled={file.length === 0} color='red' onClick={clearFile}>
						Удалить
					</Button>
				</Group>
			</Flex>
		</Dropzone>
	)
}
