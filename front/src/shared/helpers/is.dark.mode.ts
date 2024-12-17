import { useMantineColorScheme } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'

export function isDarkMode() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme()
	const colorSchemeSystem = useColorScheme()

	const isDark = colorScheme === 'dark' || (colorScheme === 'auto' && colorSchemeSystem === 'dark')

	return { isDark, toggleColorScheme }
}
