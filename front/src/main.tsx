import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { createTheme, Input, type MantineColorsTuple, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { Router } from '@providers/router/router'

import '@mantine/notifications/styles.css'
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
	components: {
		Input: Input.extend({
			styles: (style) => ({
				input: {
					borderColor: style.colors.pink[3]
				}
			})
		})
	}
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
			<MantineProvider theme={theme} defaultColorScheme='auto'>
				<ModalsProvider>
					<Notifications />
					<Router />
				</ModalsProvider>
			</MantineProvider>
		</GoogleOAuthProvider>
	</StrictMode>
)
