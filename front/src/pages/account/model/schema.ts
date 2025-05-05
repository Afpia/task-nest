import { z } from 'zod'

export const AccountScheme = z.object({
	email: z.string().email({ message: 'Неправильная почта' }).trim()
})
