import { useEffect } from 'react'
import { useUnit } from 'effector-react'

import { Box, Button, Divider, Flex, Select, Skeleton, Text, Textarea, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'

import { AccountLayout } from '@app/layouts'
import { $username } from '@shared/auth'
import { $avatar, getUserAvatarFx } from '@shared/store'

import { AvatarChange } from './avatar'

interface Form {
	about: string
	avatar: string
	name: string
	pronouns: string
	surname: string
}

export const Personal = () => {
	const [user, avatar, loading] = useUnit([$username, $avatar, getUserAvatarFx.pending])

	const form = useForm({
		mode: 'controlled',
		initialValues: { name: '', surname: '', avatar: '', about: '', pronouns: 'Не важно' }
		// validate: zodResolver(ProfileScheme)
	})

	useEffect(() => {
		if (!loading && user) {
			const surname = user?.split(' ')[1]
			const name = user?.split(' ')[0]
			form.setValues({
				name,
				surname,
				avatar
				// about: '',
				// newPassword: ''
			})
		}
	}, [user, avatar])

	const onClickForm = (values: Form) => {
		// loginError(form)
		// login({ data: values })
		console.log('update profile', values)
	}

	return (
		<AccountLayout>
			<form onSubmit={form.onSubmit((values) => onClickForm(values))}>
				{form.getValues().avatar === '' && <Skeleton h='127px' mb={20} style={{ borderRadius: '10px' }} w='100%' />}
				{!(form.getValues().avatar === '') && <AvatarChange form={form} />}
				<Box>
					<Flex justify='space-between' w='100%'>
						<Title fw={600} mb={10} size={14} order={3}>
							Полное имя
						</Title>
					</Flex>
					<Flex align='start' gap={20} h='100%' justify='start' w='100%'>
						<TextInput label='Имя' radius='md' w='48%' {...form.getInputProps('name')} />
						<TextInput label='Фамилия' radius='md' w='48%' {...form.getInputProps('surname')} />
					</Flex>
				</Box>
				<Divider mb={20} mt={20} w='100%' />
				<Box>
					<Flex w='100%' direction='column'>
						<Title fw={600} mb={10} size={14} order={3}>
							О себе
						</Title>
						<Text mb={14} size='14px'>
							Расскажите о немного о себе
						</Text>
						<Textarea w='48%' {...form.getInputProps('about')} />
					</Flex>
				</Box>
				<Divider mb={20} mt={20} w='100%' />
				<Box>
					<Flex w='100%' direction='column'>
						<Title fw={600} mb={10} size={14} order={3}>
							Произношение
						</Title>
						<Select
							data={['Не важно', 'он/его', 'она/её', 'они/их']}
							w='48%'
							allowDeselect={false}
							{...form.getInputProps('pronouns')}
						/>
					</Flex>
				</Box>
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
