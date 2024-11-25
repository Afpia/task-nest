import { Lock } from 'lucide-react'

import { AccountLayout } from '@app/layouts'
import { Button, Divider, Flex, PasswordInput, Text, Title } from '@mantine/core'
import { useForm } from '@mantine/form'

interface Form {
	password: string
	newPassword: string
}

export const Password = () => {
	const form = useForm({
		mode: 'controlled',
		initialValues: { password: '', newPassword: '' }
		// validate: zodResolver(ProfileScheme)
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
					<Title mb={10} order={3} size={14} fw={600}>
						Пароль
					</Title>
					<Text size='14px' mb={14}>
						Изменение текущего пароля
					</Text>
				</Flex>
				<Flex w='100%' align='start' justify='start' gap={20}>
					<PasswordInput label='Текущий пароль' radius='md' w='48%' {...form.getInputProps('password')} leftSection={<Lock />} />
					<PasswordInput label='Новый пароль' radius='md' w='48%' {...form.getInputProps('newPassword')} leftSection={<Lock />} />
				</Flex>
				<Divider w='100%' mb={20} mt={20} />
				<Flex w='100%' justify='flex-end'>
					<Button type='submit' radius='lg' bg='rgb(64, 192, 87)'>
						Сохранить
					</Button>
				</Flex>
			</form>
		</AccountLayout>
	)
}
