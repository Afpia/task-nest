import { createTheme, MantineProvider, type MantineTheme } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { myColors } from '@shared/config'

import { AuthProvider } from './providers/auth'
import { Router } from './router'

import '@mantine/notifications/styles.css'
import '@mantine/spotlight/styles.css'
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
					color: style.colors.pink[1]
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

export const App = () => (
	<MantineProvider theme={theme} defaultColorScheme='auto'>
		<ModalsProvider>
			<AuthProvider>
				<Notifications />
				<Router />
			</AuthProvider>
		</ModalsProvider>
	</MantineProvider>
)
