import { Navigate, Outlet } from 'react-router-dom'
import { useUnit } from 'effector-react'

import { $isAuth } from '@app/providers/auth'
import { routes } from '@shared/config'

// export const PrivateRouter = () => {
// 	const isLogin = useUnit($isAuth)
// 	// const { session } = useAuth()

// 	// const isLogin = !!session.access_token
// 	return isLogin ? <Outlet /> : <Navigate to={routes.LOGIN} replace={true} />
// }
