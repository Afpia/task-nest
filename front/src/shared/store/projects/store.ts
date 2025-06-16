import { createStore } from 'effector'

import { allUserExpired } from '@shared/auth'
import type { ProjectResponse, ProjectStatsResponse, UserFieldResponse } from '@shared/types'

export const $projects = createStore<ProjectResponse[]>([] as ProjectResponse[]).reset(allUserExpired)
export const $currentProject = createStore<{ project: ProjectResponse }>({} as { project: ProjectResponse }).reset(allUserExpired)
export const $usersProject = createStore<UserFieldResponse[]>([] as UserFieldResponse[]).reset(allUserExpired)
export const $projectsStats = createStore<ProjectStatsResponse[]>([] as ProjectStatsResponse[]).reset(allUserExpired)
