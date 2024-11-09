import { LayoutHome } from '@app/layouts'
import { privateMain } from '@shared/auth'
import { routes } from '@shared/config'

import { Home } from './ui'

export const HomeRoute = {
	view: Home,
	route: privateMain(routes.private.home),
	layout: LayoutHome
}
