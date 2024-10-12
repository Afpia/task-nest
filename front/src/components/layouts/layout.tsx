import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Flex } from '@mantine/core'

import { Sidebar } from './sidebar/sidebar'

export const Layout: FC = () => (
	<Flex>
		<Sidebar />
		<Outlet />
	</Flex>
)
