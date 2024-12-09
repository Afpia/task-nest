import { useState } from 'react'
import { useUnit } from 'effector-react'
import { CirclePlus } from 'lucide-react'

import { Button, Flex, Modal, TextInput, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { createdProjects } from '@shared/store'

export const CreateProject = () => {
	const [projectName, setProjectName] = useState('Проект')
	const [opened, { open, close }] = useDisclosure(false)
	const [createProject] = useUnit([createdProjects])

	const createProjectClick = () => {
		close()
		createProject(projectName)
	}

	return (
		<Flex align='center' justify='space-between' mb={18}>
			<Title c='#868E96' order={2} size={12} ta='left' tt='uppercase'>
				Проекты
			</Title>
			<CirclePlus cursor='pointer' size='16' onClick={open} />
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
		</Flex>
	)
}
