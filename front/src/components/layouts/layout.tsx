import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Flex } from '@mantine/core'

import { Header } from './header/header'
import { Sidebar } from './sidebar/sidebar'

import styles from './layout.module.css'

export const Layout: FC = () => (
	<Flex h='100vh' w='100vw'>
		<Sidebar />
		<Flex direction='column' style={{ width: 'calc(100% - 230px)' }} className={styles.root}>
			<Header />
			<Outlet />
		</Flex>
	</Flex>
)
