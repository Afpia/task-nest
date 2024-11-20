import { useUnit } from 'effector-react'
import { LogOut, Trash } from 'lucide-react'

import { Button, Flex, Text, Title } from '@mantine/core'
import { modals } from '@mantine/modals'
import { allUserExpired } from '@shared/auth'

export const Security = () => {
	const [onExit] = useUnit([allUserExpired])

	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: 'Удалить свой профиль',
			centered: true,
			children: (
				<Text size='sm'>
					Вы уверены, что хотите удалить свой профиль? Это действие удалит аккаунт без права на восстановление.
				</Text>
			),
			labels: { confirm: 'Удалить аккаунт', cancel: 'Отмена' },
			confirmProps: { color: 'red' },
			onConfirm: () => console.log('Confirmed')
		})

	// TODO: Удаление

	return (
		<Flex direction='column' w='100%'>
			<Title mb={10} order={3} size={14} fw={600}>
				Безопасность учетной записи
			</Title>
			<Text size='14px' mb={16}>
				Управляйте безопасностью своей учетной записи
			</Text>
			<Flex w='100%' justify='space-between'>
				<Flex gap={20}>
					<Button variant='outline' radius='md' onClick={onExit} leftSection={<LogOut />}>
						Выйти
					</Button>
					<Button onClick={openDeleteModal} variant='outline' radius='md' leftSection={<Trash />} c='red' bd='1px solid #ff8787'>
						Удалить мой аккаунт
					</Button>
				</Flex>
				<Button type='submit' radius='md' bg='rgb(64, 192, 87)'>
					Обновить профиль
				</Button>
			</Flex>
		</Flex>
	)
}
