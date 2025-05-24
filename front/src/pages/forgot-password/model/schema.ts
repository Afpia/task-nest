import { z } from 'zod'

export const PasswordScheme = z.object({
	email: z.string().email({ message: 'Неправильная почта' }).trim()
})
export type PasswordSchemeType = z.infer<typeof PasswordScheme>
