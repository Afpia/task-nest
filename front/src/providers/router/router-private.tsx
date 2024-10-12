import { Navigate, Outlet } from 'react-router-dom'

import { ROUTES } from '@utils/constants/ROUTES'

export const PrivateRouter = () => {
	// const { session } = useAuth();

	const isLogin = true

	return isLogin ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace={true} />
}
