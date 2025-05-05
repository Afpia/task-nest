import { createEvent, sample } from 'effector'

import { createMutation } from '@farfetched/core'

import { postTaskProject } from '@shared/api'
import { $isAuth } from '@shared/auth'
import type { PostTaskProjectConfig, TaskRequest } from '@shared/types'

import { $currentProject } from '../projects'

import { getTasksProjectFx } from './get'

export const createdTask = createEvent<TaskRequest>()

export const postTaskProjectFx = createMutation({
	name: 'postTaskProject',
	handler: ({ params, data }: PostTaskProjectConfig) => postTaskProject({ params, data }),
	enabled: $isAuth
})

sample({
	clock: createdTask,
	source: $currentProject,
	fn: (src, clk) => ({
		params: { projectId: String(src.project.id) },
		data: { ...clk, project_id: src.project.id, user_id: 1, start_date: '2024-12-21' }
	}),
	target: postTaskProjectFx.start
})

sample({
	clock: postTaskProjectFx.finished.success,
	source: $currentProject,
	fn: (clk) => ({
		params: { projectId: String(clk.project.id) }
	}),
	target: getTasksProjectFx.start
})
