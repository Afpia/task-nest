import { chainRoute } from 'atomic-router'
import { createEffect } from 'effector'

import { routes } from '@shared/config'

import { getUserProject } from '../api'

export const getUserProjectFx = createEffect(getUserProject)

// const route = chainRoute({
// 	route: routes.private.project,
// 	beforeOpen: {
// 		effect: getUserProjectFx
// 		mapParams: (params) => params.params.projectId
// 	}
// })
