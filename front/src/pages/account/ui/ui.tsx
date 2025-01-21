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
					<Title fw={600} mb={10} size={14} order={3}>
						Контактный адрес электронной почты
					</Title>
					<Text mb={14} size='14px'>
						Управление адресом электронной почты учетной записи для восстановления
					</Text>
				</Flex>
				<Flex w='100%'>
					<TextInput label='Почта' radius='md' w='48%' leftSection={<Mail />} {...form.getInputProps('email')} />
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
