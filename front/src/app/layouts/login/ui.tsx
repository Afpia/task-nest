import type { ReactNode } from 'react'

import { Flex, Text } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'

import { Logo } from '@app/assets/svg'
import video from '@assets/video/1.mp4'

import styles from './ui.module.css'

export const LayoutLogin = ({ children }: { children: ReactNode }) => {
	const colorScheme = useColorScheme()

	return (
		<Flex>
			<video className={styles.video} src={video} muted playsInline autoPlay loop />
			<Text fs='italic' fz='30' left='30px' pos='absolute' top='30px'>
				<Logo color={colorScheme === 'dark' ? '#fff' : '#000'} />
			</Text>
			<Flex align='center' gap='xs' h='100vh' justify='center' w='78vw' direction='column'>
				{children}
			</Flex>
		</Flex>
	)
}
