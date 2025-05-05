import type { UseFormReturnType } from '@mantine/form'

import { notifyError } from './notification'

export const handleError = (
	form: UseFormReturnType<any>,
	message: string,
	title: string,
	formErrors?: { [key: string]: boolean | string }
) => {
	notifyError({
		title,
		message
	})
	if (formErrors) form.setErrors(formErrors)
}
