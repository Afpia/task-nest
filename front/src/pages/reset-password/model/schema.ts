import { z } from 'zod'

export const PasswordResetScheme = z
	.object({
		password: z.string().min(8, { message: 'Ваш пароль должен содержать минимум 8 символов.' }),
		confirmPassword: z.string()
	})
	.refine((values) => values.password === values.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword']
	})
export type PasswordResetSchemeType = z.infer<typeof PasswordResetScheme>
