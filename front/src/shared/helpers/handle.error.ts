import type { UseFormReturnType } from '@mantine/form'

import { notifyError } from './notification'

export const handleError = (form: UseFormReturnType<any>, message: string, formErrors: { [key: string]: string | boolean }) => {
	notifyError({
		title: 'Мы не смогли войти в систему',
		message
	})
	form.setErrors(formErrors)
}
