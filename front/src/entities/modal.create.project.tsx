import { useState } from 'react'
import { useUnit } from 'effector-react'

import { Button, Flex, Modal, TextInput } from '@mantine/core'

import { createdProject } from '@shared/store'

// eslint-disable-next-line style/member-delimiter-style
export const ModalCreateProject = ({ opened, close }: { opened: boolean; close: () => void }) => {
	const [projectName, setProjectName] = useState('Проект')
	const [createProject] = useUnit([createdProject])

	const createProjectClick = () => {
		close()
		createProject(projectName)
	}

	return (
		<Modal centered opened={opened} onClose={close} title='Вы уверены что хотите создать новый проект?'>
			<TextInput
				label='Название проекта'
				value={projectName}
				onChange={(event) => setProjectName(event.target.value)}
				data-autofocus
				mb={20}
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
