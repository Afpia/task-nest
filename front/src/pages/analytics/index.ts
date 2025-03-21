import { LayoutHome } from '@app/layouts'
import { privateMain } from '@shared/auth'
import { routes } from '@shared/config'

import { Analytics } from './ui'

export const AnalyticsRoute = {
	view: Analytics,
	route: privateMain(routes.private.analytics),
	layout: LayoutHome
}
