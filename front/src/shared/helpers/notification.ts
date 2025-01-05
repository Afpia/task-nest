import { notifications } from '@mantine/notifications'

interface NotificationProps {
	message: string
	title: string
}

export const notifySuccess = ({ title, message }: NotificationProps) => {
	notifications.show({
		color: 'green',
		title,
		message
	})
}

export const notifyError = ({ title, message }: NotificationProps) => {
	notifications.show({
		color: 'red',
		title,
		message
	})
}
