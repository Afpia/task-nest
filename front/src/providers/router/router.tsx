import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ROUTES } from '@utils/constants/ROUTES'
import { NotFound } from '@pages/not-found'
import { PrivateRouter } from './router-private'
import { Login } from '@pages/login/login'

const router = createBrowserRouter([
	{
		path: '*',
		element: <NotFound />
	},
	{
		path: ROUTES.LOGIN,
		element: <Login />
	},
	{
		path: ROUTES.SIGNUP
		// element: <Signup />,
	},
	{
		path: ROUTES.MAIN,
		element: <PrivateRouter />,
		children: [
			{
				path: ROUTES.MAIN
			}
		]
	}
])
export const Router = () => <RouterProvider router={router} />
