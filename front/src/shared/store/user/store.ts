import { createStore } from 'effector'

import { allUserExpired } from '@shared/auth'
import type { UserFieldResponse } from '@shared/types'

export const $user = createStore<UserFieldResponse>({} as UserFieldResponse).reset(allUserExpired)
export const $userLogin = createStore<UserFieldResponse>({} as UserFieldResponse).reset(allUserExpired)
export const $userSearch = createStore<UserFieldResponse[]>([] as UserFieldResponse[]).reset(allUserExpired)
