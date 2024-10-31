import { useState } from 'react'

import { Button, Flex, PasswordInput, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { signupSchema } from '@pages/signup/model'

export const Form = () => {
	const [loading, setLoading] = useState(false)

	const form = useForm({
		mode: 'controlled',
		initialValues: { name: '', surname: '', password: '', email: '' },
		validate: zodResolver(signupSchema)
	})

	return (
		<form onSubmit={form.onSubmit((values) => console.log(values))}>
			<Flex justify='space-between' mb={35}>
				<TextInput {...form.getInputProps('name')} label='Имя' size='lg' radius='md' disabled={loading} w={185} />
				<TextInput {...form.getInputProps('surname')} label='Фамилия' size='lg' radius='md' disabled={loading} w={185} />
			</Flex>
			<TextInput {...form.getInputProps('email')} label='Почта' size='lg' radius='md' mb={35} disabled={loading} w={400} />
			<PasswordInput
				{...form.getInputProps('password')}
				label='Пароль'
				radius='md'
				size='lg'
				w={400}
				disabled={loading}
				placeholder='8+ символов'
			/>
			<Button type='submit' mt={28} w={400} variant='filled' color='pink' size='lg' radius='xl' h={50} loading={loading}>
				Создать аккаунт
			</Button>
		</form>
	)
}
