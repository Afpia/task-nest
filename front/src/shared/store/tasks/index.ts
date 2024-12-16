import { createEffect, createStore } from 'effector'

import { deleteTaskProject, getTasksProject, postTaskProject, putTaskStatusProject } from '@shared/api'
import type { PostTaskProjectConfig, TasksResponse } from '@shared/types'

export const $tasks = createStore([] as TasksResponse)
export const $tasksUser = createStore([] as TasksResponse)

export const getTasksProjectFx = createEffect((projectId: string) => getTasksProject({ params: { projectId } }))
export const getUserTasksProjectFx = createEffect()

export const postTaskProjectFx = createEffect(({ params, data }: PostTaskProjectConfig) => postTaskProject({ params, data }))

export const putTaskStatusProjectFx = createEffect((taskId: string) => putTaskStatusProject({ params: { taskId } }))

export const deleteTaskProjectFx = createEffect((taskId: string) => deleteTaskProject({ params: { taskId } }))
