import { createEffect, createEvent, createStore, sample } from 'effector'

import { deleteProject, getProjectsWorkspace, postProjectWorkspace, putProject } from '@shared/api'
import { notifyError, notifySuccess } from '@shared/notifications'
import type { DeleteProjectConfig, PostProjectWorkspaceConfig, ProjectsResponse, PutProjectConfig } from '@shared/types'

import { $currentWorkspace, changedWorkspace, getUserWorkspacesFx } from '../workspaces'

export const $projects = createStore<ProjectsResponse>([] as ProjectsResponse)

export const getProjectsWorkspaceFx = createEffect((workspaceId: string) => getProjectsWorkspace({ params: { workspaceId } }))
export const postProjectWorkspaceFx = createEffect(({ params, data }: PostProjectWorkspaceConfig) =>
	postProjectWorkspace({ params, data })
)
export const putProjectFx = createEffect(({ params, data }: PutProjectConfig) => putProject({ params, data }))
export const deleteProjectFx = createEffect(({ params }: DeleteProjectConfig) => deleteProject({ params }))

export const createdProject = createEvent<string>()
// eslint-disable-next-line style/member-delimiter-style
export const updatedProject = createEvent<{ id: number; title: string }>()
export const deletedProject = createEvent<{ id: number }>()

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
	fn: (source, clock) => ({
		params: { workspaceId: source.id },
		data: { title: clock }
	}),
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

// Обновление проекта

sample({
	clock: updatedProject,
	fn: (clock) => ({
		params: { projectId: clock.id },
		data: { title: clock.title }
	}),
	target: putProjectFx
})

sample({
	clock: putProjectFx.doneData,
	source: $currentWorkspace,
	fn: (source) => {
		notifySuccess({
			title: 'Успешно',
			message: 'Проект успешно обновлен'
		})
		return source.id
	},
	target: getProjectsWorkspaceFx
})

// TODO: Сделать без запроса

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
	fn: (clock) => ({
		params: { projectId: clock.id }
	}),
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

// TODO: Сделать без запроса

sample({
	clock: deleteProjectFx.failData,
	fn: () => {
		notifyError({
			title: 'Ошибка',
			message: 'Проект не был удален'
		})
	}
})
