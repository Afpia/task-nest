import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'

import { Button, Flex, Modal, TextInput } from '@mantine/core'

import { putProjected } from '@shared/store'
import type { ProjectResponse } from '@shared/types'

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
	const [putProject] = useUnit([putProjected])

	const updateProjectClick = () => {
		close()
		putProject({ title: projectName, id: item!.id })
	}

	useEffect(() => {
		setProjectName(item?.title || '')
	}, [item])

	return (
		<Modal title='Вы уверены что хотите изменить название проекту?' centered onClose={close} opened={opened}>
			<TextInput
				label='Новое название проекта'
				mb={20}
				value={projectName}
				data-autofocus
				onChange={(event) => setProjectName(event.target.value)}
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
