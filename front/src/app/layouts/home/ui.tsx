import { Box, Flex, useMantineTheme } from '@mantine/core'
import type { Children } from '@shared/types'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'

import styles from './ui.module.css'

export const LayoutHome = ({ children }: Children) => {
	const theme = useMantineTheme()

	return (
		<Flex h='100vh' w='100vw'>
			<Sidebar />
			<Flex direction='column' style={{ width: 'calc(100% - 230px)' }} className={styles.root} mr={10} mb={10}>
				<Header />
				<Box bg={theme.white} className={styles.layout} p={20}>
					{children}
				</Box>
			</Flex>
		</Flex>
	)
}
