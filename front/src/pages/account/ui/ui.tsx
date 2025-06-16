import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { Mail, ScanFace } from 'lucide-react'

import { Button, Divider, Flex, Skeleton, Text, TextInput, Title } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import { AccountLayout } from '@app/layouts'
import { $user, getUserFx, patchedUser, patchUserFx, updateFormed } from '@shared/store'

import { AccountScheme } from '../model'

interface Form {
	email: string
	login: string
}

export const Account = () => {
	const [user, loadingUser, updateUser, loadingUpdate, updateError] = useUnit([
		$user,
		getUserFx.$pending,
		patchedUser,
		patchUserFx.$pending,
		updateFormed
	])

	const form = useForm({
		mode: 'controlled',
		initialValues: { email: '', login: '' },
		validate: zodResolver(AccountScheme)
	})

	const onClickForm = (values: Form) => {
		updateError(form)
		updateUser({
			email: values.email,
			login: values.login
		})
		form.reset()
	}

	useEffect(() => {
		if (!loadingUser && user) {
			form.setValues({
				email: user.email,
				login: user.login
			})
			form.setInitialValues({ email: user.email, login: user.login })
		}
	}, [user])

	return (
		<AccountLayout>
			{loadingUser && <Skeleton h='260px' mb={20} style={{ borderRadius: '10px' }} w='100%' />}
			{!loadingUser && (
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
					<Flex w='100%' direction='column'>
						<Title fw={600} mb={10} size={14} order={3}>
							Логин учетной записи
						</Title>
						<Text mb={14} size='14px'>
							Ваш личный логин, который используется для поиска
						</Text>
					</Flex>
					<Flex w='100%'>
						<TextInput label='Логин' radius='md' w='48%' leftSection={<ScanFace />} {...form.getInputProps('login')} />
					</Flex>
					<Flex justify='flex-end' w='100%'>
						<Button
							bg='rgb(64, 192, 87)'
							disabled={loadingUpdate || (!form.isDirty('email') && !form.isDirty('login'))}
							radius='lg'
							type='submit'
						>
							Сохранить
						</Button>
					</Flex>
				</form>
			)}
		</AccountLayout>
	)
}
