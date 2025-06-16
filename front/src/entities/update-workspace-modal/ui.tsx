import { useEffect } from 'react'
import { useUnit } from 'effector-react'

import { Button, Flex, Modal, Textarea, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { updatedWorkspace } from '@shared/store'

export const ModalUpdateWorkspace = ({
	opened,
	close,
	id,
	title,
	description
}: {
	opened: boolean
	close: () => void
	id: string
	title: string
	description: string
}) => {
	const [updateWorkspace] = useUnit([updatedWorkspace])

	const form = useForm({
		mode: 'controlled',
		initialValues: { title, description }
	})

	useEffect(() => {
		if (opened) {
			form.setValues({ title, description })
		}
	}, [opened, title, description])

	const updateWorkspaceClick = (values: any) => {
		updateWorkspace({ description: values.description, workspaceId: id, title: values.title })
		close()
	}

	return (
		<Modal
			size='lg'
			styles={{ title: { fontSize: '20px', fontWeight: '600' } }}
			title='Обновление рабочего пространства'
			centered
			onClose={close}
			opened={opened}
		>
			<form onSubmit={form.onSubmit((values) => updateWorkspaceClick(values))}>
				<TextInput label='Название рабочего пространства' mb={20} {...form.getInputProps('title')} data-autofocus />
				<Textarea
					label='Описание рабочего пространства'
					radius='md'
					styles={{ input: { height: '180px' } }}
					{...form.getInputProps('description')}
					mb={10}
				/>
				<Flex align='center' gap='20' justify='flex-end'>
					<Button variant='light' onClick={close}>
						Отмена
					</Button>
					<Button type='submit'>Обновить</Button>
				</Flex>
			</form>
		</Modal>
	)
}
