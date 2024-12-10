import { createEffect, createStore, sample } from 'effector'

import { getUserProjects } from '@shared/api'
import { $currentWorkspace, getUserWorkspacesFx } from '@widgets/sidebar/ui/projects/model/index'

export const $countProjects = createStore<number>(0)

// export const getUserProjectsFx = createEffect((workspace: string) => getUserProjects({ params: { workspace } }))

// sample({
// 	clock: [$currentWorkspace, getUserWorkspacesFx.doneData],
// 	source: $currentWorkspace,
// 	fn: (source) => source.id,
// 	target: getUserProjectsFx
// })

// sample({
// 	clock: getUserProjectsFx.doneData,
// 	fn: ({ data }) => data.length,
// 	target: $countProjects
// })

// Получаем все воркспейсы,  от изменения юзера глобального стора, находим текущий ворспейс, когда изменился воркспейс мы получаем все его проекты
