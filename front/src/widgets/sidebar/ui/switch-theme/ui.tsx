import { Moon, Sun } from 'lucide-react'

import { Flex, Switch, useMantineColorScheme } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'

export const SwitchTheme = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme()
	const colorSchemeSystem = useColorScheme()

	const isDark = colorScheme === 'dark' || (colorScheme === 'auto' && colorSchemeSystem === 'dark')

	return (
		<Flex align='center' justify='space-between' mb={10}>
			<Flex align='center' gap={10} ml={10}>
				{isDark ? <Moon /> : <Sun />}
				{isDark ? 'Темная тема' : 'Светлая тема'}
			</Flex>
			<Switch color='pink' onClick={toggleColorScheme} checked={isDark} size='md' />
		</Flex>
	)
}
