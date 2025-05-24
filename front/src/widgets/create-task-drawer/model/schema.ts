import { z } from 'zod'

export const CreateTaskSchema = z.object({
	title: z.string().min(3, { message: 'Название слишком короткое' }).trim(),
	end_date: z
		.date({
			invalid_type_error: 'Это обязательное поле'
		})
		.nullable(),
	assignees: z.array(z.string()).min(1, { message: 'Должен быть минимум один исполнитель' }),
	description: z.string().min(3, { message: 'Описание слишком короткое' }).trim()
})
