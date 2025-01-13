import { notifications } from '@mantine/notifications'

interface NotificationProps {
	message: string
	title: string
}

export const notifySuccess = ({ title, message }: NotificationProps) => {
	notifications.show({
		withBorder: true,
		color: 'green',
		title,
		message
	})
}

export const notifyError = ({ title, message }: NotificationProps) => {
	notifications.show({
		withBorder: true,
		color: 'red',
		title,
		message
	})
}
