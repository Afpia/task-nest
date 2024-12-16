import { Box, Flex, ScrollArea, useMantineColorScheme } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'

import { ThemeColors } from '@shared/config'
import type { Children } from '@shared/types'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'

export const LayoutHome = ({ children }: Children) => {
	const { colorScheme } = useMantineColorScheme()
	const colorSchemeSystem = useColorScheme()

	// eslint-disable-next-line style/operator-linebreak
	const color =
		colorScheme === 'dark' || (colorScheme === 'auto' && colorSchemeSystem === 'dark')
			? ThemeColors.secondDark
			: ThemeColors.secondLight

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
