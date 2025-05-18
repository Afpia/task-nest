import { lazy, Suspense } from 'react'

import { Flex, Skeleton } from '@mantine/core'

import { LayoutLogin } from '@app/layouts'
import { privateResetPassword } from '@shared/auth/privateResetPassword'
import { routes } from '@shared/config'

const ResetPassword = lazy(() => import('./ui'))

export const ResetPasswordRoute = {
	view: () => (
		<Suspense
			fallback={
				<Flex align='center' h='100vh' justify='flex-start' left='22vw' ml={200} w='100%' pos='absolute'>
					<Skeleton height={500} radius='md' width={400} />
				</Flex>
			}
		>
			<ResetPassword />
		</Suspense>
	),
	route: privateResetPassword(routes.auth.resetPassword),
	layout: LayoutLogin
}
