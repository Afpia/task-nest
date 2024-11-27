import { LayoutHome } from '@app/layouts'
import { privateMain } from '@shared/auth'
import { routes } from '@shared/config'

import { Account, Password, Personal } from './ui'

export const AccountRoute = {
	view: Account,
	route: privateMain(routes.private.account),
	layout: LayoutHome
}

export const AccountPersonalRoute = {
	view: Personal,
	route: privateMain(routes.private.account_personal),
	layout: LayoutHome
}

export const AccountPasswordRoute = {
	view: Password,
	route: privateMain(routes.private.account_password),
	layout: LayoutHome
}
