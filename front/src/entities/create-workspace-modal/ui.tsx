import { useRef, useState } from 'react'
import { useUnit } from 'effector-react'

import { Avatar, Button, Flex, Group, Modal, Text, Textarea, TextInput } from '@mantine/core'
import type { FileWithPath } from '@mantine/dropzone'
import { Dropzone } from '@mantine/dropzone'
import { useForm } from '@mantine/form'

import { createdWorkspace } from '@shared/store'

export const ModalCreateWorkspace = ({ opened, close }: { opened: boolean; close: () => void }) => {
	const [file, setFile] = useState<FileWithPath[]>([])
	const [createWorkspace] = useUnit([createdWorkspace])

	const openRef = useRef<() => void>(null)

	const form = useForm({
		mode: 'controlled',
		initialValues: { image_url: '', title: '', description: '' }
		// validate: zodResolver(PersonalScheme)
	})

	const createWorkspaceClick = (values: any) => {
		const formData = new FormData()
		if ((values.image_url as any) instanceof File) formData.append('image_url', values.image_url)
		formData.append('title', values.title)
		formData.append('description', values.description)

		createWorkspace(formData)
		close()
	}

	const onDrop = (files: FileWithPath[]) => {
		setFile(files)
		form.setValues({
			image_url: files[0] as unknown as string
		})
	}

	const clearFile = () => {
		setFile([])
		form.setValues({
			image_url: '' as string
		})
	}

	const preview = file.map((first) => {
		const imageUrl = URL.createObjectURL(first)

		return imageUrl
	})

	return (
		<Modal
			size='lg'
			styles={{ title: { fontSize: '20px', fontWeight: '600' } }}
			title='Создание нового рабочего пространства'
			centered
			onClose={close}
			opened={opened}
		>
			<form onSubmit={form.onSubmit((values) => createWorkspaceClick(values))}>
				<TextInput label='Название рабочего пространства' mb={20} {...form.getInputProps('title')} data-autofocus />
				<Dropzone
					accept={['image/png', 'image/jpeg']}
					activateOnClick={false}
					bg='default'
					maxSize={2 * 1024 ** 2}
					mb={20}
					multiple={false}
					p={20}
					style={{ borderRadius: '4px' }}
					w='100%'
					acceptColor='green'
					onDrop={onDrop}
					openRef={openRef}
					rejectColor='red'
				>
					<Flex align='center' h='100%' justify='space-between' w='100%'>
						<Flex align='center' gap={20} justify='start'>
							<Avatar radius='100%' size='85' src={preview[0]} variant='default' />
							<Flex align='flex-start' gap={10} h='100%' justify='center' direction='column'>
								<Flex gap={2} direction='column'>
									<Text>Фотография рабочего пространства</Text>
									<Text c='gray' size='sm'>
										PNG, JPG меньше 5 МБ
									</Text>
								</Flex>
								<Group justify='center'>
									<Button radius='md' style={{ pointerEvents: 'all' }} onClick={() => openRef.current?.()}>
										Выбрать фото
									</Button>
									<Button
										disabled={file.length === 0}
										radius='md'
										style={{ pointerEvents: 'all' }}
										color='red'
										onClick={clearFile}
									>
										Удалить
									</Button>
								</Group>
							</Flex>
						</Flex>
					</Flex>
				</Dropzone>
				<Textarea
					label='Описание рабочего пространства'
					radius='md'
					styles={{ input: { height: '180px' } }}
					placeholder='Область для хранения проектов...'
					{...form.getInputProps('description')}
					mb={10}
				/>
				<Flex align='center' gap='20' justify='flex-end'>
					<Button variant='light' onClick={close}>
						Отмена
					</Button>
					<Button type='submit'>Создать</Button>
				</Flex>
			</form>
		</Modal>
	)
}
