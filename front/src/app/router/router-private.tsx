import { Navigate, Outlet } from 'react-router-dom'

import { routes } from '@shared/config'

export const PrivateRouter = () => {
	// const { session } = useAuth();

	const isLogin = true

	return isLogin ? <Outlet /> : <Navigate to={routes.LOGIN} replace={true} />
}
