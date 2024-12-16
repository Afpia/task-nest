import { Moon, Sun } from 'lucide-react'

import { Flex, Switch } from '@mantine/core'

import { isDarkMode } from '@shared/helpers'

export const SwitchTheme = () => {
	// const { colorScheme, toggleColorScheme } = useMantineColorScheme()
	// const colorSchemeSystem = useColorScheme()

	// const isDark = colorScheme === 'dark' || (colorScheme === 'auto' && colorSchemeSystem === 'dark')
	const { isDark, toggleColorScheme } = isDarkMode()

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
