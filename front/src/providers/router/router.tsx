import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from '@components/layouts/layout'
import { Home } from '@pages/home/home'
import { Login } from '@pages/login/login'
import { NotFound } from '@pages/not-found/not-found'
import { ROUTES } from '@utils/constants/ROUTES'

import { PrivateRouter } from './router-private'

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
