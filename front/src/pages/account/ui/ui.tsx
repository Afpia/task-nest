import { Mail } from 'lucide-react'

import { Button, Divider, Flex, Text, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'

import { AccountLayout } from '@app/layouts'

interface Form {
	email: string
}

export const Account = () => {
	const form = useForm({
		mode: 'controlled',
		initialValues: { email: '' }
		// validate: zodResolver(ProfileScheme)
	})

	const onClickForm = (values: Form) => {
		// loginError(form)
		// login({ data: values })
		console.log('update profile', values)
	}

	// useEffect(() => {
	// 	if (!loading && user) {
	// 		const surname = user?.name?.split(' ')[1]
	// 		const name = user?.name?.split(' ')[0]
	// 		form.setValues({
	// 			email: user.email,
	// 			name,
	// 			surname,
	// 			avatar,
	// 			password: '',
	// 			newPassword: ''
	// 		})
	// 	}
	// }, [user, avatar])

	return (
		<AccountLayout>
			<form onSubmit={form.onSubmit((values) => onClickForm(values))}>
				<Flex w='100%' direction='column'>
					<Title mb={10} order={3} size={14} fw={600}>
						Контактный адрес электронной почты
					</Title>
					<Text size='14px' mb={14}>
						Управление адресом электронной почты учетной записи для восстановления
					</Text>
				</Flex>
				<Flex w='100%'>
					<TextInput radius='md' w='48%' label='Почта' leftSection={<Mail />} {...form.getInputProps('email')} />
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
