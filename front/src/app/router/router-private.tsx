import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@app/hooks/useAuth'
import { routes } from '@shared/config'

export const PrivateRouter = () => {
	const { session } = useAuth()

	const isLogin = !!session.access_token

	return isLogin ? <Outlet /> : <Navigate to={routes.LOGIN} replace={true} />
}
