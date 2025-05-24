import { api } from '@shared/api'

import type { PostPasswordEmailConfig } from './types'

export const postPasswordEmail = async ({ data, config }: PostPasswordEmailConfig) => api.post('password/email', data, config)
