import { createEvent, createStore, sample } from 'effector'

import type { TaskResponse } from '@shared/types'
import { $tasks } from '@widgets/stats-workspace/model'

export const $assignedTaskWidget = createStore<TaskResponse[]>([] as TaskResponse[])

export const changedPositionItem = createEvent<TaskResponse[]>()
export const changedActiveTask = createEvent<number | string | null>()
export const changedOrder = createEvent<'asc' | 'desc'>()

export const $activeTask = createStore<number | string | null>(null).on(changedActiveTask, (_, id) => id)

sample({
	clock: changedOrder,
	source: $tasks,
	fn: (tasks, order) => {
		if (!tasks || tasks.length === 0) return tasks
		const copy = [...tasks]
		copy.sort((a, b) => {
			const da = new Date(a.end_date ?? '').getTime()
			const db = new Date(b.end_date ?? '').getTime()
			return order === 'asc' ? da - db : db - da
		})
		return copy
	},
	target: $tasks
})

sample({
	clock: changedPositionItem,
	target: $tasks
})
