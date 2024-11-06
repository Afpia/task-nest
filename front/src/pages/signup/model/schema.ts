import { z } from 'zod'

export const signupSchema = z.object({
	name: z
		.string()
		// eslint-disable-next-line regexp/no-obscure-range
		.regex(/^[а-я]+$/i, { message: 'Строка должна содержать только кириллицу' })
		.min(1, { message: 'Это поле обязательно' })
		.trim(),
	surname: z
		.string()
		// eslint-disable-next-line regexp/no-obscure-range
		.regex(/^[а-я]+$/i, { message: 'Строка должна содержать только кириллицу' })
		.min(1, { message: 'Это поле обязательно' })
		.trim(),
	password: z.string().min(8, { message: 'Пароль должен быть не менее 8 символов' }).trim(),
	email: z.string().email({ message: 'Неправильная почта' }).trim()
})
