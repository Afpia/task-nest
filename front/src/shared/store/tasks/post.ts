import dayjs from 'dayjs'
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
	fn: (source, clock) => ({
		params: { projectId: source.project.id.toString() },
		data: {
			...clock,
			project_id: source.project.id,
			user_id: Number(clock.assignees[0]),
			start_date: dayjs(new Date()).format('YYYY-MM-DD')
		}
	}),
	target: postTaskProjectFx.start
})

sample({
	clock: postTaskProjectFx.finished.success,
	source: $currentProject,
	fn: (clock) => ({
		params: { projectId: clock.project.id.toString() }
	}),
	target: getTasksProjectFx.start
})
