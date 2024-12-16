import { RouterProvider } from 'atomic-router-react'

import { createTheme, MantineProvider, type MantineTheme } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'

import { Pages } from '@pages/index'
import { myColors, router, started } from '@shared/config'

import '@mantine/notifications/styles.css'
import '@mantine/spotlight/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/core/styles.css'
import '@assets/styles/global.css'

const theme = createTheme({
	colors: {
		pink: myColors
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
					// eslint-disable-next-line style/quote-props
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
	</MantineProvider>
)
