import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Flex } from '@mantine/core'

import styles from './ui.module.css'

export const Layout: FC = () => (
	<Flex h='100vh' w='100vw'>
		<Sidebar />
		<Flex direction='column' style={{ width: 'calc(100% - 230px)' }} className={styles.root} mr={10} mb={10}>
			<Header />
			<Outlet />
		</Flex>
	</Flex>
)
