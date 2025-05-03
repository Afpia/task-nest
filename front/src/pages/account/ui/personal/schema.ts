import { z } from 'zod'

export const PersonalScheme = z.object({
	name: z.string().min(1, { message: 'Это поле обязательно' }).trim(),
	surname: z.string().min(1, { message: 'Это поле обязательно' }).trim(),
	about: z.string().max(255, { message: 'Максимум 255 символов' }).trim(),
	city: z.string().trim()
})
