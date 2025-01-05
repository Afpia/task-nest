import { Box, Flex, ScrollArea, useMantineColorScheme } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'

import { ThemeColors } from '@shared/config'
import type { Children } from '@shared/types'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'

export const LayoutHome = ({ children }: Children) => {
	const { colorScheme } = useMantineColorScheme()
	const colorSchemeSystem = useColorScheme()

	const color =
		colorScheme === 'dark' || (colorScheme === 'auto' && colorSchemeSystem === 'dark')
			? ThemeColors.secondDark
			: ThemeColors.secondLight

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
