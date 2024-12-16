import { Flex, Text } from '@mantine/core'
import { useColorScheme } from '@mantine/hooks'

import { Logo } from '@app/assets/svg'
import video from '@assets/video/1.mp4'
import type { Children } from '@shared/types'

import styles from './ui.module.css'

export const LayoutLogin = ({ children }: Children) => {
	const colorScheme = useColorScheme()

	return (
		<Flex>
			<video className={styles.video} playsInline src={video} autoPlay loop muted />
			<Text fs='italic' pos='absolute' fz='30' top='30px' left='30px'>
				<Logo color={colorScheme === 'dark' ? '#fff' : '#000'} />
			</Text>
			<Flex gap='xs' h='100vh' w='78vw' justify='center' align='center' direction='column'>
				{children}
			</Flex>
		</Flex>
	)
}
