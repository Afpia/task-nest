import { Suspense } from 'react'
import { RouterProvider } from 'atomic-router-react'

import { createTheme, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { NavigationProgress } from '@mantine/nprogress'

import { LoadingPage, Pages } from '@pages/index'
import { Dark, myColors, router } from '@shared/config'

import '@mantine/notifications/styles.css'
import '@mantine/spotlight/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/core/styles.css'
import '@mantine/nprogress/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/tiptap/styles.css'
import '@mantine/charts/styles.css'

const theme = createTheme({
	colors: {
		pink: myColors,
		dark: Dark
	},
	primaryColor: 'pink',
	defaultGradient: { from: 'pink', to: 'blue' }
})

export const App = () => (
	<MantineProvider theme={theme} defaultColorScheme='light'>
		<ModalsProvider>
			<Notifications />
			<RouterProvider router={router}>
				<Suspense fallback={<LoadingPage />}>
					<Pages />
				</Suspense>
			</RouterProvider>
		</ModalsProvider>
		<NavigationProgress />
	</MantineProvider>
)
