import { createEvent, createStore } from 'effector'

import type { ProjectResponse } from '@shared/types'

export const activeProjected = createEvent<ProjectResponse | null>()
// eslint-disable-next-line style/member-delimiter-style
export const setMenuPositioned = createEvent<{ x: number; y: number } | null>()

export const $activeProject = createStore<ProjectResponse | null>(null).on(activeProjected, (_, project) => project)
// eslint-disable-next-line style/member-delimiter-style
export const $menuPosition = createStore<{ x: number; y: number } | null>(null).on(setMenuPositioned, (_, position) => position)
