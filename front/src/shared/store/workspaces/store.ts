import { createStore } from 'effector'

import { allUserExpired } from '@shared/auth'
import type { WorkspaceResponse } from '@shared/types'

export const $currentWorkspace = createStore<WorkspaceResponse>({} as WorkspaceResponse).reset(allUserExpired)
export const $workspaces = createStore<WorkspaceResponse[]>([] as WorkspaceResponse[]).reset(allUserExpired)
