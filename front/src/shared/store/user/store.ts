import { createStore } from 'effector'

import type { UserFieldResponse } from '@shared/types'

export const $user = createStore<UserFieldResponse>({} as UserFieldResponse)
