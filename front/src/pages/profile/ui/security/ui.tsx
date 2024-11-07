import { useUnit } from 'effector-react'
import { LogOut, Trash } from 'lucide-react'

import { Button, Flex, useMantineTheme } from '@mantine/core'
import { allUserExpired } from '@shared/auth'

export const Security = () => {
	const theme = useMantineTheme()

	const [onExit] = useUnit([allUserExpired])

	return (
		<Flex w='60%' justify='flex-start' gap={20}>
			<Button variant='outline' radius='md' onClick={onExit} leftSection={<LogOut />}>
				Выйти
			</Button>
			<Button variant='outline' radius='md' leftSection={<Trash />} c={theme.colors.red[6]}>
				Удалить мой аккаунт
			</Button>
		</Flex>
	)
}
