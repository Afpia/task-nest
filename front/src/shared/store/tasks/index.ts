import { createEffect, createStore, sample } from 'effector'

import { deleteTaskProject, getTasksProject, postTaskProject, putTaskStatusProject } from '@shared/api'
import { privateRouteOpened, routes } from '@shared/config'
import type { PostTaskProjectConfig, TasksResponse } from '@shared/types'

import { $currentProject } from '../projects'

export const $tasks = createStore([] as TasksResponse)
export const $tasksUser = createStore([] as TasksResponse)

export const getTasksProjectFx = createEffect((projectId: number) => getTasksProject({ params: { projectId } }))
export const getUserTasksProjectFx = createEffect()

export const postTaskProjectFx = createEffect(({ params, data }: PostTaskProjectConfig) => postTaskProject({ params, data }))

export const putTaskStatusProjectFx = createEffect((taskId: string) => putTaskStatusProject({ params: { taskId } }))

export const deleteTaskProjectFx = createEffect((taskId: string) => deleteTaskProject({ params: { taskId } }))

sample({
	clock: $currentProject,
	source: $tasks,
	filter: $tasks.map((tasks) => !tasks.length),
	fn: (_, clk) => clk.project.id,
	target: getTasksProjectFx
})
