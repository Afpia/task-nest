import { Flex } from '@mantine/core'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar/sidebar'

export const Layout: FC = () => {
	return (
		<>
			<Flex>
				<Sidebar />
				<Outlet />
			</Flex>
		</>
	)
}
