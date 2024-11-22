import { notifications } from '@mantine/notifications'

interface NotificationProps {
	title: string
	message: string
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
