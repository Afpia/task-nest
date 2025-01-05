import { createEffect, createEvent, createStore, sample } from 'effector'

import { setNavigationProgress } from '@mantine/nprogress'

import { deleteProject, getCurrentProject, getProjectsWorkspace, postProjectWorkspace, putProject } from '@shared/api'
import { privateProjectRouteParams } from '@shared/config'
import { notifyError, notifySuccess } from '@shared/helpers/notification'
import type {
	DeleteProjectConfig,
	PostProjectWorkspaceConfig,
	ProjectResponse,
	ProjectsResponse,
	PutProjectConfig
} from '@shared/types'

import { $currentWorkspace, changedWorkspace, getUserWorkspacesFx } from '../workspaces'

export const $projects = createStore<ProjectsResponse>([] as ProjectsResponse)
export const $currentProject = createStore<{ project: ProjectResponse }>({} as { project: ProjectResponse })

export const getProjectsWorkspaceFx = createEffect((workspaceId: string) => getProjectsWorkspace({ params: { workspaceId } }))

export const getCurrentProjectFx = createEffect((projectId: string) => getCurrentProject({ params: { projectId } }))

export const postProjectWorkspaceFx = createEffect(({ params, data }: PostProjectWorkspaceConfig) =>
	postProjectWorkspace({ params, data })
)

export const putProjectFx = createEffect(({ params, data }: PutProjectConfig) => putProject({ params, data }))

export const deleteProjectFx = createEffect(({ params }: DeleteProjectConfig) => deleteProject({ params }))

export const createdProject = createEvent<string>()
export const updatedProject = createEvent<{ id: number; title: string }>()
export const deletedProject = createEvent<{ id: number }>()

// Получение текущего проекта

sample({
	clock: privateProjectRouteParams,
	fn: (clk) => clk.projectId,
	target: getCurrentProjectFx
})

sample({
	clock: getCurrentProjectFx.doneData,
	fn: ({ data }) => data,
	target: $currentProject
})

// Проекты

sample({
	clock: [changedWorkspace, getUserWorkspacesFx.doneData],
	source: $currentWorkspace,
	fn: (source) => source.id,
	target: getProjectsWorkspaceFx
})

sample({
	clock: getProjectsWorkspaceFx.doneData,
	fn: ({ data }) => data,
	target: $projects
})

// Создание проекта

sample({
	clock: createdProject,
	source: $currentWorkspace,
	fn: (source, clock) => {
		setNavigationProgress(80)

		return {
			params: { workspaceId: source.id },
			data: { title: clock }
		}
	},
	target: postProjectWorkspaceFx
})

sample({
	clock: postProjectWorkspaceFx.doneData,
	source: $projects,
	fn: (source, clock) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Проект успешно создан'
		})
		return [...source, clock.data]
	},
	target: $projects
})

sample({
	clock: postProjectWorkspaceFx.failData,
	source: $projects,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Проект не создан'
		})
	}
})

// Обновление проекта, только название

sample({
	clock: updatedProject,
	fn: (clock) => {
		setNavigationProgress(80)

		return {
			params: { projectId: clock.id },
			data: { title: clock.title }
		}
	},
	target: putProjectFx
})

sample({
	clock: putProjectFx.doneData,
	source: $projects,
	fn: (source, clock) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Проект успешно обновлен'
		})

		return source.map((item) => (item.id === clock.data.id ? clock.data : item))
	},
	target: $projects
})

sample({
	clock: putProjectFx.failData,
	fn: () => {
		notifySuccess({
			title: 'Ошибка',
			message: 'Проект не был обновлен'
		})
	}
})

// Удаление проекта

sample({
	clock: deletedProject,
	fn: (clock) => {
		setNavigationProgress(80)

		return {
			params: { projectId: clock.id }
		}
	},
	target: deleteProjectFx
})

sample({
	clock: deleteProjectFx.doneData,
	source: $projects,
	fn: (source, clock) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Проект успешно удален'
		})
		return source.filter((project) => project.id !== clock.data.id)
	},
	target: $projects
})

sample({
	clock: deleteProjectFx.failData,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Проект не был удален'
		})
	}
})
