import { z } from 'zod'

export const signupSchema = z.object({
	name: z.string().min(1, { message: 'Это поле обязательно' }).trim(),
	surname: z.string().min(1, { message: 'Это поле обязательно' }).trim(),
	password: z.string().min(8, { message: 'Пароль должен быть не менее 8 символов' }).trim(),
	email: z.string().email({ message: 'Неправильная почта' }).trim()
})
