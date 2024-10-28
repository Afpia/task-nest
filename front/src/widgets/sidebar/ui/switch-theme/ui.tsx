import { Moon, Sun } from 'lucide-react'

import { Box, Divider, Switch, Text, useMantineColorScheme } from '@mantine/core'

import styles from './ui.module.css'

export const SwitchTheme = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme()
	const isDark = colorScheme === 'dark'

	return (
		<Box mb={10}>
			<Divider my='lg' variant='dashed' />
			<Box className={styles.switch}>
				<Text className={styles.switchText} ml={10}>
					{isDark ? <Moon /> : <Sun />}
					{isDark ? 'Темная тема' : 'Светлая тема'}
				</Text>
				<Switch className={styles.switchButton} color='pink' onClick={toggleColorScheme} checked={isDark} size='md' />
			</Box>
		</Box>
	)
}
