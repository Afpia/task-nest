import type { ReactNode } from 'react'

import { Box, Flex, ScrollArea } from '@mantine/core'

import { Header } from '@widgets/header'

export const LayoutHeader = ({ children }: { children: ReactNode }) => (
	<Flex h='100vh' w='100vw'>
		<Flex h='100%' mih='100%' w='100%' direction='column'>
			<ScrollArea>
				<Header />
				<Box h='100%' mih='calc(100vh - 90px)' p={20}>
					{children}
				</Box>
			</ScrollArea>
		</Flex>
	</Flex>
)
