import { api } from '@shared/api'

import type { PostUserConfig, PostUserSocialConfig, UserResponse } from './types'

export const postUser = async (requestConfig?: PostUserConfig) => api.post<UserResponse>('login', requestConfig)

export const postUserAccess = async ({ data, config }: PostUserSocialConfig) => api.post<UserResponse>('accessUser', data, config)
