import { useUnit } from 'effector-react'

import { Menu, Text } from '@mantine/core'
import { modals } from '@mantine/modals'

import { deletedProject } from '@shared/store'
import type { ProjectResponse } from '@shared/types'

import { $menuPosition } from '../../model'

export const Dropdown = ({ item, open }: { item: ProjectResponse; open: () => void }) => {
	const [deleteProject, menuPosition] = useUnit([deletedProject, $menuPosition])

	const openDeleteModal = ({ id }: { id: number }) =>
		modals.openConfirmModal({
			title: 'Удалить проект',
			centered: true,
			children: (
				<Text size='sm'>Вы уверены, что хотите удалить проект? Это действие удалит проект без права на восстановление.</Text>
			),
			labels: { confirm: 'Удалить проект', cancel: 'Отмена' },
			confirmProps: { color: 'red' },
			onConfirm: () => deleteProject({ id })
		})

	return (
		<Menu.Dropdown styles={{ dropdown: { top: menuPosition?.y, left: menuPosition?.x } }}>
			<Menu.Item onClick={open}>Изменить название</Menu.Item>
			<Menu.Item onClick={() => openDeleteModal({ id: item.id })}>Удалить проект</Menu.Item>
		</Menu.Dropdown>
	)
}
