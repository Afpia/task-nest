import { useState } from 'react'
import { useUnit } from 'effector-react'

import { Button, Flex, Modal, TextInput } from '@mantine/core'

import { createdProject } from '@shared/store'

export const ModalCreateProject = ({ opened, close }: { opened: boolean; close: () => void }) => {
	const [projectName, setProjectName] = useState('Проект')
	const [createProject] = useUnit([createdProject])

	const createProjectClick = () => {
		close()
		setProjectName('Проект')
		createProject(projectName)
	}

	return (
		<Modal title='Вы уверены что хотите создать новый проект?' centered onClose={close} opened={opened}>
			<TextInput
				label='Название проекта'
				mb={20}
				value={projectName}
				data-autofocus
				onChange={(event) => setProjectName(event.target.value)}
			/>
			<Flex align='center' gap='20' justify='flex-end'>
				<Button variant='light' onClick={close}>
					Отмена
				</Button>
				<Button onClick={createProjectClick}>Создать</Button>
			</Flex>
		</Modal>
	)
}
