import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from '@components/layouts/layout'
import { Analytics, Home, Login, NotFound, Profile } from '@pages/index'
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
		path: ROUTES.MAIN,
		element: <PrivateRouter />,
		children: [
			{
				element: <Layout />,
				children: [
					{ path: ROUTES.PROFILE, element: <Profile /> },
					{ path: ROUTES.ANALYTICS, element: <Analytics /> },
					{ path: ROUTES.MAIN, element: <Home /> }
				]
			}
		]
	}
])

export const Router = () => <RouterProvider router={router} />
