import { useRef, useState } from 'react'
import { useUnit } from 'effector-react'

import { Avatar, Button, Flex, Group, Modal, MultiSelect, Select, Text, TextInput } from '@mantine/core'
import type { FileWithPath } from '@mantine/dropzone'
import { Dropzone } from '@mantine/dropzone'

import { createdWorkspace } from '@shared/store'

export const ModalCreateWorkspace = ({ opened, close }: { opened: boolean; close: () => void }) => {
	const [workspaceName, setWorkspaceName] = useState('')
	const [file, setFile] = useState<FileWithPath[]>([])
	const [createWorkspace] = useUnit([createdWorkspace])

	const openRef = useRef<() => void>(null)

	// const [createProject] = useUnit([createdProject])

	const createWorkspaceClick = () => {
		close()
		// setProjectName('Проект')
		createWorkspace(workspaceName)
	}

	const onDrop = (files: FileWithPath[]) => {
		setFile(files)
	}

	const clearFile = () => {
		setFile([])
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
			<TextInput
				label='Название рабочего пространства'
				mb={20}
				value={workspaceName}
				data-autofocus
				onChange={(event) => setWorkspaceName(event.target.value)}
			/>
			<Dropzone
				accept={['image/png', 'image/jpeg']}
				activateOnClick={false}
				bg='default'
				maxSize={5 * 1024 ** 2}
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
								<Button disabled={file.length === 0} radius='md' style={{ pointerEvents: 'all' }} color='red' onClick={clearFile}>
									Удалить
								</Button>
							</Group>
						</Flex>
					</Flex>
				</Flex>
			</Dropzone>
			<Select
				defaultValue='private'
				label='Кто может получить доступ к этому рабочему пространству?'
				mb={20}
				data={[
					{ value: 'public', label: 'Открытый доступ для всех' },
					{ value: 'personal', label: 'Только я' },
					{ value: 'private', label: 'Только по приглашению' }
				]}
				allowDeselect={false}
			/>
			<MultiSelect
				data={['Арсений', 'Кондраша', 'Русланчик', 'Ваня']}
				label='Пригласить друзей в это рабочее пространство'
				maxValues={3}
				mb={60}
				clearable
				searchable
				hidePickedOptions
				nothingFoundMessage='Такого друга у вас нет'
				placeholder='Выберите 3 друзей'
			/>
			<Flex align='center' gap='20' justify='flex-end'>
				<Button variant='light' onClick={close}>
					Отмена
				</Button>
				<Button onClick={createWorkspaceClick}>Создать</Button>
			</Flex>
		</Modal>
	)
}
