import { ROUTES } from '@utils/constants/ROUTES'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRouter = () => {
	// const { session } = useAuth();

	const isLogin = false

	return isLogin ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace={true} />
}
