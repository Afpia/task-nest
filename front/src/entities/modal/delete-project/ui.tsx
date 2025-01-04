import { useState } from 'react'
import { useUnit } from 'effector-react'

import { Button, Flex, Modal, TextInput } from '@mantine/core'

import { createdProject, deletedProject } from '@shared/store'

export const ModalCreateProject = ({ opened, close }: { opened: boolean; close: () => void }) => {
	const [deleteProject] = useUnit([deletedProject])

	const createProjectClick = () => {
		close()
		deleteProject({ id: 1 })
	}

	return (
		<Modal centered opened={opened} onClose={close} title='Вы уверены что хотите создать новый проект?'>
			{/* <TextInput
				label='Название проекта'
				value={projectName}
				onChange={(event) => setProjectName(event.target.value)}
				data-autofocus
				mb={20}
			/> */}
			<Flex align='center' gap='20' justify='flex-end'>
				<Button variant='light' onClick={close}>
					Отмена
				</Button>
				<Button onClick={createProjectClick}>Создать</Button>
			</Flex>
		</Modal>
	)
}
