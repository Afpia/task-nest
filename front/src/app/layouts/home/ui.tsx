import { Box, Flex, ScrollArea, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'
import type { Children } from '@shared/types'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'
import { reloadedWindow } from '@widgets/sidebar/model'

import styles from './ui.module.css'

export const LayoutHome = ({ children }: Children) => {
	const { colorScheme } = useMantineColorScheme()
	const color = colorScheme === 'dark' ? '#1c1b22' : '#f6f6f6'

	return (
		<Flex h='100vh' w='100vw'>
			<Sidebar />
			<Flex direction='column' w='calc(100% - 230px)' h='100%' mih='100%'>
				<ScrollArea>
					<Header />
					<Box p={20} bg={color} style={{ borderRadius: '20px 0px 0px 0px' }} mih='calc(100vh - 90px)' h='100%'>
						{children}
					</Box>
				</ScrollArea>
			</Flex>
		</Flex>
	)
}
