import { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const LayoutNotification: FC = () => {
	return (
		<>
			<Outlet />
			{/* <Notifications style={{ position: 'absolute' }} position='top-right' /> */}
		</>
	)
}
