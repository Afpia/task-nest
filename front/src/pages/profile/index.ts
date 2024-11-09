import { LayoutHome } from '@app/layouts'
import { privateMain } from '@shared/auth'
import { routes } from '@shared/config'

import { Profile } from './ui'

export const ProfileRoute = {
	view: Profile,
	route: privateMain(routes.private.profile),
	layout: LayoutHome
}
