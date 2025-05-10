import { lazy, Suspense } from 'react'

import { Flex, Skeleton } from '@mantine/core'

import { LayoutLogin } from '@app/layouts'
import { privateAuth } from '@shared/auth'
import { routes } from '@shared/config'

const Login = lazy(() => import('./ui'))

export const LoginRoute = {
	view: () => (
		<Suspense
			fallback={
				<Flex align='center' h='100vh' justify='flex-start' left='22vw' ml={200} w='100%' pos='absolute'>
					<Skeleton height={500} radius='md' width={400} />
				</Flex>
			}
		>
			<Login />
		</Suspense>
	),
	route: privateAuth(routes.auth.login),
	layout: LayoutLogin
}
