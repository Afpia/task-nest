import { Lock } from 'lucide-react'

import { Button, Divider, Flex, PasswordInput, Text, Title } from '@mantine/core'
import { useForm } from '@mantine/form'

import { AccountLayout } from '@app/layouts'

interface Form {
	newPassword: string
	password: string
}

export const Password = () => {
	const form = useForm({
		mode: 'controlled',
		initialValues: { password: '', newPassword: '' }
		// validate: {
		// 	newPassword: (value, values) => (value !== values.password ? 'Пароль не совпадает' : null)
		// }
	})

	const onClickForm = (values: Form) => {
		// loginError(form)
		// login({ data: values })
		console.log('update profile', values)
	}

	return (
		<AccountLayout>
			<form onSubmit={form.onSubmit((values) => onClickForm(values))}>
				<Flex w='100%' direction='column'>
					<Title fw={600} mb={10} size={14} order={3}>
						Пароль
					</Title>
					<Text mb={14} size='14px'>
						Изменение текущего пароля
					</Text>
				</Flex>
				<Flex align='start' gap={20} justify='start' w='100%'>
					<PasswordInput label='Текущий пароль' radius='md' w='48%' {...form.getInputProps('password')} leftSection={<Lock />} />
					<PasswordInput label='Новый пароль' radius='md' w='48%' {...form.getInputProps('newPassword')} leftSection={<Lock />} />
				</Flex>
				<Divider mb={20} mt={20} w='100%' />
				<Flex justify='flex-end' w='100%'>
					<Button bg='rgb(64, 192, 87)' radius='lg' type='submit'>
						Сохранить
					</Button>
				</Flex>
			</form>
		</AccountLayout>
	)
}
