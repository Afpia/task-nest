import { createTheme, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { myColors } from '@shared/config'

import { Router } from './router'

import '@mantine/notifications/styles.css'
import '@mantine/spotlight/styles.css'
import '@mantine/core/styles.css'

const theme = createTheme({
	colors: {
		pink: myColors
	},
	primaryColor: 'pink'
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
			<Notifications />
			<Router />
		</ModalsProvider>
	</MantineProvider>
)
