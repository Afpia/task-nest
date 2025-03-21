import { createStore } from 'effector'

import type { ProjectResponse } from '@shared/types'

export const $projects = createStore<ProjectResponse[]>([] as ProjectResponse[])
export const $currentProject = createStore<{ project: ProjectResponse }>({} as { project: ProjectResponse })
