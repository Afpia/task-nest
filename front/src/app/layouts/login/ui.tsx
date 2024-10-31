import { Outlet } from 'react-router-dom'

import { Logo } from '@app/assets/svg'
import video from '@assets/video/1.mp4'
import { Flex, Text } from '@mantine/core'

import styles from './ui.module.css'

export const LayoutLogin = () => (
	<Flex>
		<video className={styles.video} playsInline src={video} autoPlay loop muted />
		<Text fs='italic' pos='absolute' fz='30' top='30px' left='30px'>
			<Logo />
		</Text>
		<Flex gap='xs' h='100vh' w='78vw' justify='center' align='center' direction='column'>
			<Outlet />
		</Flex>
	</Flex>
)
