import { LayoutHome } from '@app/layouts'
import { privateMain } from '@shared/auth'
import { routes } from '@shared/config'

import { Project } from './ui'

export const ProjectRoute = {
	view: Project,
	route: privateMain(routes.private.project),
	layout: LayoutHome
}
