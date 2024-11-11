import { useUnit } from 'effector-react'
import { LogOut, Trash } from 'lucide-react'

import { Button, Flex, Text, Title, useMantineTheme } from '@mantine/core'
import { allUserExpired } from '@shared/auth'

export const Security = () => {
	const theme = useMantineTheme()

	const [onExit] = useUnit([allUserExpired])

	return (
		<Flex direction='column' w='60%'>
			<Title mb={10} c={theme.black} order={3} size={14} fw={600}>
				Безопасность учетной записи
			</Title>
			<Text size='14px' mb={16}>
				Управляйте безопасностью своей учетной записи
			</Text>
			<Flex gap={20}>
				<Button variant='outline' radius='md' onClick={onExit} leftSection={<LogOut />}>
					Выйти
				</Button>
				<Button variant='outline' radius='md' leftSection={<Trash />} c={theme.colors.red[6]}>
					Удалить мой аккаунт
				</Button>
			</Flex>
		</Flex>
	)
}
