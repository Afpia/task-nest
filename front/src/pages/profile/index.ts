import { LayoutHome } from '@app/layouts'
import { routes } from '@shared/config'

import { Profile } from './ui'

export const ProfileRoute = {
	view: Profile,
	route: routes.private.profile,
	layout: LayoutHome
}
