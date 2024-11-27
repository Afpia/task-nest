import { Box, Flex, ScrollArea, useMantineColorScheme } from '@mantine/core'
import { ThemeColors } from '@shared/config'
import type { Children } from '@shared/types'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'

export const LayoutHome = ({ children }: Children) => {
	const { colorScheme } = useMantineColorScheme()
	const color = colorScheme === 'dark' ? ThemeColors.secondDark : ThemeColors.secondLight

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
