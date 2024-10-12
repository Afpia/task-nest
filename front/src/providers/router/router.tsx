import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ROUTES } from '@utils/constants/ROUTES'
import { NotFound } from '@pages/not-found/not-found'
import { PrivateRouter } from './router-private'
import { Login } from '@pages/login/login'
import { Home } from '@pages/home/home'
import { Layout } from '@components/layouts/layout'

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
				element: <Layout />,
				children: [{ path: ROUTES.MAIN, element: <Home /> }]
			}
		]
	}
])

export const Router = () => <RouterProvider router={router} />
