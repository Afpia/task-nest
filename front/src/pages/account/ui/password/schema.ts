import { z } from 'zod'

export const PasswordScheme = z.object({
	current_password: z.string().min(8, { message: 'Пароль должен быть не менее 8 символов' }).trim(),
	password: z.string().min(8, { message: 'Пароль должен быть не менее 8 символов' }).trim()
})
