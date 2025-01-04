import { useUnit } from 'effector-react'

import { Menu } from '@mantine/core'

import { deletedProject } from '@shared/store'
import { ProjectResponse } from '@shared/types'

import { $menuPosition, openDeleteModal } from '../../model'

export const Dropdown = ({ item, open }: { item: ProjectResponse; open: () => void }) => {
	const [deleteProject, menuPosition] = useUnit([deletedProject, $menuPosition])

	return (
		<Menu.Dropdown styles={{ dropdown: { top: menuPosition?.y, left: menuPosition?.x } }}>
			<Menu.Item onClick={open}>Изменить название</Menu.Item>
			<Menu.Item onClick={() => openDeleteModal({ id: item.id, deleteProject })}>Удалить проект</Menu.Item>
		</Menu.Dropdown>
	)
}
