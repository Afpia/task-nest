import { useUnit } from 'effector-react'

import { Menu, Text } from '@mantine/core'
import { modals } from '@mantine/modals'

import { putProjected } from '@shared/store'
import type { ProjectResponse } from '@shared/types'

import { $menuPosition } from '../../model'

export const Dropdown = ({ item, open }: { item: ProjectResponse; open: () => void }) => {
	const [menuPosition, putProject] = useUnit([$menuPosition, putProjected])

	const openUpdateStatusModal = ({ id }: { id: number }) =>
		modals.openConfirmModal({
			title: 'Завершить проект',
			centered: true,
			children: <Text size='sm'>Вы уверены, что хотите завершить проект?</Text>,
			labels: { confirm: 'Завершить проект', cancel: 'Отмена' },
			confirmProps: { color: 'green' },
			onConfirm: () => putProject({ id, status: 'Завершён' })
		})

	return (
		<Menu.Dropdown styles={{ dropdown: { top: menuPosition?.y, left: menuPosition?.x } }}>
			<Menu.Item onClick={open}>Изменить название</Menu.Item>
			<Menu.Item onClick={() => openUpdateStatusModal({ id: item.id })}>Завершить проект</Menu.Item>
			{/* <Menu.Item onClick={() => openDeleteModal({ id: item.id })}>Удалить проект</Menu.Item> */}
		</Menu.Dropdown>
	)
}
