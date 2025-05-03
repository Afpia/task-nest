import { createStore } from 'effector'

import type { UserFieldResponse } from '@shared/types'

export const $user = createStore<UserFieldResponse>({} as UserFieldResponse)
export const $userId = createStore<UserFieldResponse>({} as UserFieldResponse)
export const $userSearch = createStore<UserFieldResponse[]>([] as UserFieldResponse[])
