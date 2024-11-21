import { Box, Flex, ScrollArea, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import type { Children } from '@shared/types'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'

import styles from './ui.module.css'

export const LayoutHome = ({ children }: Children) => (
	// const { colorScheme } = useMantineColorScheme()
	// const color = colorScheme === 'dark' ? '#1c1b22' : '#fff'

	<Flex h='100vh' w='100vw'>
		<Sidebar />
		<Flex direction='column' style={{ width: 'calc(100% - 230px)' }} className={styles.root}>
			<ScrollArea>
				<Header />
				<Box className={styles.layout} p={20}>
					{children}
				</Box>
			</ScrollArea>
		</Flex>
	</Flex>
)
