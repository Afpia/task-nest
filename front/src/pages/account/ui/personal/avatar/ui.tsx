import { useRef, useState } from 'react'
import { useUnit } from 'effector-react'

import { Avatar, Button, Flex, Group, Text } from '@mantine/core'
import { Dropzone, type FileWithPath } from '@mantine/dropzone'
import type { UseFormReturnType } from '@mantine/form'

import { AvatarSrc } from '@shared/helpers'
import { $user } from '@shared/store'

export const AvatarChange = ({
	form
}: {
	form: UseFormReturnType<
		{
			name: string
			surname: string
			avatar: string
			about: string
			city: string
		},
		(values: { name: string; surname: string; avatar: string; about: string; city: string }) => {
			name: string
			surname: string
			avatar: string
			about: string
			city: string
		}
	>
}) => {
	const [user] = useUnit([$user])
	const [file, setFile] = useState<FileWithPath[]>([])
	const openRef = useRef<() => void>(null)

	const onDrop = (files: FileWithPath[]) => {
		setFile(files)
		form.setValues({
			avatar: files[0] as unknown as string
		})
		form.setDirty({ avatar: true })
	}

	const clearFile = () => {
		setFile([])
		form.setValues({
			avatar: user.avatar_url as string
		})
		form.setDirty({ avatar: false })
	}

	const preview = file.map((first) => {
		const imageUrl = URL.createObjectURL(first)

		return imageUrl
	})

	return (
		<Dropzone
			accept={['image/png', 'image/jpeg']}
			activateOnClick={false}
			bg='default'
			itemType='file'
			maxSize={2 * 1024 ** 2}
			mb={20}
			multiple={false}
			p={20}
			style={{ borderRadius: '10px' }}
			w='100%'
			acceptColor='green'
			onDrop={onDrop}
			openRef={openRef}
			rejectColor='red'
		>
			<Flex align='center' h='100%' justify='space-between' w='100%'>
				<Flex align='center' gap={20} justify='start'>
					<Avatar radius='100%' size='85' src={preview[0] || AvatarSrc(form.getValues().avatar)} variant='default' />
					<Flex align='flex-start' gap={10} h='100%' justify='center' direction='column'>
						<Text>Фотография профиля</Text>
						<Text>PNG, JPG меньше 2 МБ</Text>
					</Flex>
				</Flex>
				<Group justify='center'>
					<Button radius='md' style={{ pointerEvents: 'all' }} onClick={() => openRef.current?.()}>
						Выбрать фото
					</Button>
					<Button disabled={file.length === 0} radius='md' style={{ pointerEvents: 'all' }} color='red' onClick={clearFile}>
						Удалить
					</Button>
				</Group>
			</Flex>
		</Dropzone>
	)
}
