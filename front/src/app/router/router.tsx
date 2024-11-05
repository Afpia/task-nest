import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LayoutHome, LayoutLogin } from '@app/layouts'
import { Analytics, ForgotPassword, Home, Login, NotFound, Profile, SignUp } from '@pages/index'
import { routes } from '@shared/config'

import { PrivateRouter } from './router-private'

const router = createBrowserRouter([
	{
		path: '*',
		element: <NotFound />
	},
	{
		element: <LayoutLogin />,
		children: [
			{
				path: routes.LOGIN,
				element: <Login />
			},
			{
				path: routes.FORGOT_PASSWORD,
				element: <ForgotPassword />
			},
			{
				path: routes.SIGNUP,
				element: <SignUp />
			}
		]
	},
	{
		element: <PrivateRouter />,
		children: [
			{
				element: <LayoutHome />,
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
