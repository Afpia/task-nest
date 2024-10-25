import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from '@app/layouts'
import { Analytics, Home, Login, NotFound, Profile } from '@pages/index'
import { routes } from '@shared/config'

import { PrivateRouter } from './router-private'

const router = createBrowserRouter([
	{
		path: '*',
		element: <NotFound />
	},
	{
		path: routes.LOGIN,
		element: <Login />
	},
	{
		path: routes.MAIN,
		element: <PrivateRouter />,
		children: [
			{
				element: <Layout />,
				children: [
					{ path: routes.PROFILE, element: <Profile /> },
					{ path: routes.ANALYTICS, element: <Analytics /> },
					{ path: routes.MAIN, element: <Home /> }
				]
			}
		]
	}
])

export const Router = () => <RouterProvider router={router} />
