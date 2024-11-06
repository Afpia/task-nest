import { api } from '@shared/api'
import type { UserResponse } from '@shared/types'

import type { PostUserConfig, PostUserSocialConfig } from './types'

export const postUser = async ({ data, config }: PostUserConfig) =>
	api.post<UserResponse>('register', data, config).then((res) => res.data)

export const postUserAccess = async ({ data, config }: PostUserSocialConfig) =>
	api.post<UserResponse>('accessUser', data, config).then((res) => res.data)
