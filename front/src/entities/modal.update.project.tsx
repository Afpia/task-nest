import { useEffect, useMemo, useState } from 'react'
import { useUnit } from 'effector-react'

import { Button, Flex, Modal, TextInput } from '@mantine/core'

import { createdProject, updatedProject } from '@shared/store'
import { ProjectResponse } from '@shared/types'

export const ModalUpdateProject = ({
	opened,
	close,
	item
}: {
	opened: boolean
	close: () => void
	item: ProjectResponse | null
}) => {
	const [projectName, setProjectName] = useState('')
	const [updateProject] = useUnit([updatedProject])

	const updateProjectClick = () => {
		close()
		updateProject({ title: projectName, id: item!.id })
	}

	useEffect(() => {
		setProjectName(item?.title || '')
	}, [item])

	return (
		<Modal centered opened={opened} onClose={close} title='Вы уверены что хотите изменить название проекту?'>
			<TextInput
				label='Новое название проекта'
				value={projectName}
				onChange={(event) => setProjectName(event.target.value)}
				data-autofocus
				mb={20}
			/>
			<Flex align='center' gap='20' justify='flex-end'>
				<Button variant='light' onClick={close}>
					Отмена
				</Button>
				<Button onClick={updateProjectClick}>Изменить</Button>
			</Flex>
		</Modal>
	)
}
