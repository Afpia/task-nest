import { Link, useLocation } from 'react-router-dom'
import { ChartNoAxesCombined, CircleUserRound, Moon, Sun } from 'lucide-react'

import { Box, Divider, Flex, NavLink, Switch, Text, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core'

import { SidebarSearch } from './sidebar-search'

import styles from './sidebar.module.css'

export const Sidebar = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme()
	const pathname = useLocation().pathname
	const isDark = colorScheme === 'dark'
	const theme = useMantineTheme()

	return (
		<Flex
			direction='column'
			gap='xs'
			w='230px'
			h='100vh'
			p={10}
			justify='space-between'
			style={{ borderRight: `1px solid ${theme.colors.pink[4]}` }}
		>
			<Flex direction='column' gap='xs'>
				<NavLink
					component={Link}
					to='/profile'
					label='Профиль'
					variant='filled'
					leftSection={<CircleUserRound />}
					className={styles.root}
					active={pathname === '/profile'}
				/>
				<NavLink
					component={Link}
					to='/analytics'
					label='Аналитика'
					variant='filled'
					leftSection={<ChartNoAxesCombined />}
					className={styles.root}
					active={pathname === '/analytics'}
				/>
				<SidebarSearch />
				<Divider my='sm' color={theme.colors.pink[4]} />
				<Title order={2} size={16} className={styles.title}>
					Мои задачи
				</Title>
			</Flex>
			<Box mb={10}>
				<Divider my='lg' color={theme.colors.pink[4]} />
				<Box className={styles.switch}>
					<Text className={styles.switchText}>
						{isDark ? <Moon /> : <Sun />}
						{isDark ? 'Темная тема' : 'Светлая тема'}
					</Text>
					<Switch className={styles.switchButton} color='pink' onClick={toggleColorScheme} checked={isDark} size='md' />
				</Box>
			</Box>
		</Flex>
	)
}
