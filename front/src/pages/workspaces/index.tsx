import { LayoutHeader } from '@app/layouts'
import { privateMain } from '@shared/auth'
import { routes } from '@shared/config'

import { Workspaces } from './ui'

export const WorkspacesRoute = {
	view: Workspaces,
	route: privateMain(routes.private.workspaces),
	layout: LayoutHeader
}
