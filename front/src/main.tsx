import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createTheme, Input, type MantineColorsTuple, MantineProvider, NavLink } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { Router } from '@providers/router/router'

import '@mantine/notifications/styles.css'
import '@mantine/spotlight/styles.css'
import '@mantine/core/styles.css'

const myColor: MantineColorsTuple = [
	'#ffeaf9',
	'#fdd3ec',
	'#f5a6d4',
	'#ee75bb',
	'#e84ca6',
	'#e53399',
	'#e42493',
	'#cb1580',
	'#b60b72',
	'#a00063'
]

const theme = createTheme({
	colors: {
		pink: myColor
	},
	primaryColor: 'pink',
	components: {
		Input: Input.extend({
			styles: (style) => ({
				input: {
					borderColor: style.colors.pink[3]
				}
			})
		}),
		NavLink: NavLink.extend({
			styles: (style, { active }) => ({
				root: {
					// eslint-disable-next-line style/quote-props
					backgroundColor: active ? style.colors.pink[5] : undefined,
					'&:hover': {
						backgroundColor: style.colors.gray[2]
					}
				}
			})
		})
	}
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MantineProvider theme={theme} defaultColorScheme='auto'>
			<ModalsProvider>
				<Notifications />
				<Router />
			</ModalsProvider>
		</MantineProvider>
	</StrictMode>
)
