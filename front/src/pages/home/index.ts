import { LayoutHome } from '@app/layouts'
import { routes } from '@shared/config'

import { Home } from './ui'

export const HomeRoute = {
	view: Home,
	route: routes.private.home,
	layout: LayoutHome
}
