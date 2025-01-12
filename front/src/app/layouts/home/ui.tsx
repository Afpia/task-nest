import { Box, Flex, ScrollArea } from '@mantine/core'

import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'
import type { Children } from '@shared/types'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'

export const LayoutHome = ({ children }: Children) => {
	const { isDark } = isDarkMode()
	const color = isDark ? ThemeColors.secondDark : ThemeColors.secondLight

	return (
		<Flex h='100vh' w='100vw'>
			<Sidebar />
			<Flex h='100%' mih='100%' w='calc(100% - 230px)' direction='column'>
				<ScrollArea>
					<Header />
					<Box bg={color} h='100%' mih='calc(100vh - 90px)' p={20} style={{ borderRadius: '20px 0px 0px 0px' }}>
						{children}
					</Box>
				</ScrollArea>
			</Flex>
		</Flex>
	)
}
