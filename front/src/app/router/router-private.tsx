import { Navigate, Outlet } from 'react-router-dom'

import { routes } from '@shared/config'
import { useAuth } from '@app/hooks/useAuth'

export const PrivateRouter = () => {
	const { session } = useAuth()

	// const isLogin = true

	return session.isLogin ? <Outlet /> : <Navigate to={routes.LOGIN} replace={true} />
}
