import { createStore } from 'effector'

import { allUserExpired } from '@shared/auth'
import type { WorkspaceResponse, WorkspaceRoleResponse } from '@shared/types'

export const $currentWorkspace = createStore<WorkspaceResponse>({} as WorkspaceResponse).reset(allUserExpired)
export const $workspaces = createStore<WorkspaceResponse[]>([] as WorkspaceResponse[]).reset(allUserExpired)
export const $workspaceRole = createStore<WorkspaceRoleResponse>({} as WorkspaceRoleResponse).reset(allUserExpired)
