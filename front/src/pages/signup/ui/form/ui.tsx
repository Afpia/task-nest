import { useUnit } from 'effector-react'

import { Button, Flex, PasswordInput, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import { signupFormed, signupFx, signupSchema } from '@pages/signup/model'

interface FormFields {
	email: string
	name: string
	password: string
	surname: string
}

export const Form = () => {
	const [signup, loading, signupError] = useUnit([signupFx, signupFx.pending, signupFormed])

	const form = useForm({
		mode: 'controlled',
		initialValues: { name: '', surname: '', password: '', email: '' },
		validate: zodResolver(signupSchema)
	})

	const onClickForm = (values: FormFields) => {
		signupError(form)
		signup({ data: { name: `${values.name} ${values.surname}`, email: values.email, password: values.password } })
	}

	return (
		<form onSubmit={form.onSubmit((values) => onClickForm(values))}>
			<Flex justify='space-between' mb={35}>
				<TextInput {...form.getInputProps('name')} disabled={loading} label='Имя' radius='md' size='lg' w={185} />
				<TextInput {...form.getInputProps('surname')} disabled={loading} label='Фамилия' radius='md' size='lg' w={185} />
			</Flex>
			<TextInput {...form.getInputProps('email')} disabled={loading} label='Почта' mb={35} radius='md' size='lg' w={400} />
			<PasswordInput
				{...form.getInputProps('password')}
				disabled={loading}
				label='Пароль'
				radius='md'
				size='lg'
				w={400}
				placeholder='8+ символов'
			/>
			<Button h={50} mt={28} radius='xl' size='lg' type='submit' variant='filled' w={400} color='pink' loading={loading}>
				Создать аккаунт
			</Button>
		</form>
	)
}
