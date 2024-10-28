import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Box, Flex, useMantineTheme } from '@mantine/core'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'

import styles from './ui.module.css'

export const Layout: FC = () => {
	const theme = useMantineTheme()

	return (
		<Flex h='100vh' w='100vw'>
			<Sidebar />
			<Flex direction='column' style={{ width: 'calc(100% - 230px)' }} className={styles.root} mr={10} mb={10}>
				<Header />
				<Box bg={theme.white} className={styles.layout} px={20}>
					<Outlet />
				</Box>
			</Flex>
		</Flex>
	)
}
