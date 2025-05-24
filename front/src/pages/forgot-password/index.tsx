import { lazy, Suspense } from 'react'

import { Flex, Skeleton } from '@mantine/core'

import { LayoutLogin } from '@app/layouts'
import { privateAuth } from '@shared/auth'
import { routes } from '@shared/config'

const ForgotPassword = lazy(() => import('./ui'))

export const ForgotPasswordRoute = {
	view: () => (
		<Suspense
			fallback={
				<Flex align='center' h='100vh' justify='flex-start' left='22vw' ml={200} w='100%' pos='absolute'>
					<Skeleton height={410} radius='md' width={400} />
				</Flex>
			}
		>
			<ForgotPassword />
		</Suspense>
	),
	route: privateAuth(routes.auth.forgotPassword),
	layout: LayoutLogin
}
