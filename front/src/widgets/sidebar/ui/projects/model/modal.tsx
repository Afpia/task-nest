import { Text } from '@mantine/core'
import { modals } from '@mantine/modals'

export const openDeleteModal = ({
	id,
	deleteProject
}: {
	id: number
	deleteProject: (payload: { id: number }) => {
		id: number
	}
}) =>
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
