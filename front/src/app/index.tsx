import { RouterProvider } from 'atomic-router-react'

import { createTheme, MantineProvider, type MantineTheme } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { NavigationProgress } from '@mantine/nprogress'

import { Pages } from '@pages/index'
import { myColors, router, ThemeColors } from '@shared/config'

import '@mantine/notifications/styles.css'
import '@mantine/spotlight/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/core/styles.css'
import '@mantine/nprogress/styles.css'
import '@mantine/dates/styles.css'
import '@assets/styles/global.css'

const theme = createTheme({
	colors: {
		pink: myColors,
		dark: ['#f5f3f6', '#e6e5e6', '#cbc8cd', '#afa9b5', '#423d47', '#2c2631', '#1c1b22', '#2c2631', '#63596e', '#574b62']
	},
	primaryColor: 'pink',
	defaultGradient: { from: 'pink', to: 'blue' },
	components: {
		Anchor: {
			styles: (style: MantineTheme) => ({
				root: {
					'&:hover': {
						textDecoration: 'underline'
					},
					color: style.colors.pink[2]
				}
			})
		}
	}
	// components: {
	// 	Input: Input.extend({
	// 		styles: (style) => ({
	// 			input: {
	// 				borderColor: style.colors.pink[3]
	// 			}
	// 		})
	// 	}),
	// 	NavLink: NavLink.extend({
	// 		styles: (style, { active }) => ({
	// 			root: {
	// 				// eslint-disable-next-line style/quote-props
	// 				backgroundColor: active ? style.colors.pink[5] : undefined,
	// 				'&:hover': {
	// 					backgroundColor: style.colors.gray[2]
	// 				}
	// 			}
	// 		})
	// 	})
	// }
})

// started()

export const App = () => (
	<MantineProvider theme={theme} defaultColorScheme='auto'>
		<ModalsProvider>
			{/* <AuthProvider> */}
			<Notifications />
			{/* <Router /> */}
			<RouterProvider router={router}>
				<Pages />
			</RouterProvider>
			{/* </AuthProvider> */}
		</ModalsProvider>
		<NavigationProgress />
	</MantineProvider>
)
