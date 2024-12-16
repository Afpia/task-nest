import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { started } from '@shared/config'

import { App } from './app'

started()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
