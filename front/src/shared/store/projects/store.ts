import { createStore } from 'effector'

import type { ProjectResponse, UserFieldResponse } from '@shared/types'

export const $projects = createStore<ProjectResponse[]>([] as ProjectResponse[])
export const $currentProject = createStore<{ project: ProjectResponse }>({} as { project: ProjectResponse })
export const $usersProject = createStore<UserFieldResponse[]>([] as UserFieldResponse[])

$usersProject.watch(console.log)
