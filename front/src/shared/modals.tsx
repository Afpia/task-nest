import { Text } from '@mantine/core'
import { modals } from '@mantine/modals'

export const openConfirmModal = ({ title, text, textCancel, textConfirm, onConfirm }) => {
	modals.openConfirmModal({
		title: `${title}`,
		centered: true,
		children: <Text size='sm'>{text}</Text>,
		labels: { confirm: `${textConfirm}`, cancel: `${textCancel}` },
		confirmProps: { color: 'red' },
		onConfirm: () => onConfirm()
	})
}
