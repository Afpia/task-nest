import { api } from '@shared/api'

import type { PostPasswordResetConfig } from './types'

export const postPasswordReset = async ({ data, config }: PostPasswordResetConfig) => api.post('password/reset', data, config)
