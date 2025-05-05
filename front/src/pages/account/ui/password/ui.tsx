import { useUnit } from 'effector-react'
import { Lock } from 'lucide-react'

import { Button, Divider, Flex, PasswordInput, Text, Title } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import { AccountLayout } from '@app/layouts'
import { patchedUser, patchUserFx, updateFormed } from '@shared/store'

import { PasswordScheme } from './schema'

interface Form {
	current_password: string
	password: string
}

export const Password = () => {
	const [updateUser, updateError, loadingUpdate] = useUnit([patchedUser, updateFormed, patchUserFx.$pending])

	const form = useForm({
		mode: 'controlled',
		initialValues: { password: '', current_password: '' },
		validate: zodResolver(PasswordScheme)
	})

	const onClickForm = (values: Form) => {
		updateError(form)

		updateUser({ password: values.password, current_password: values.current_password })
		form.reset()
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
					<PasswordInput
						label='Текущий пароль'
						radius='md'
						w='48%'
						{...form.getInputProps('current_password')}
						leftSection={<Lock />}
					/>
					<PasswordInput label='Новый пароль' radius='md' w='48%' {...form.getInputProps('password')} leftSection={<Lock />} />
				</Flex>
				<Divider mb={20} mt={20} w='100%' />
				<Flex justify='flex-end' w='100%'>
					<Button bg='rgb(64, 192, 87)' disabled={loadingUpdate || !form.isDirty()} radius='lg' type='submit'>
						Сохранить
					</Button>
				</Flex>
			</form>
		</AccountLayout>
	)
}
