import { z } from 'zod'

export const schema = z.object({
	password: z.string().min(8, { message: 'Пароль должен быть не менее 8 символов' }).trim(),
	email: z.string().email({ message: 'Неправильная почта' }).trim()
})
