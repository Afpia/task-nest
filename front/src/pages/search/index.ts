import { LayoutHome } from '@app/layouts'
import { privateMain } from '@shared/auth'
import { routes } from '@shared/config'

import { Search } from './ui'

export const SearchRoute = {
	view: Search,
	route: privateMain(routes.private.search),
	layout: LayoutHome
}
