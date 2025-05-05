import { useEffect } from 'react'
import { useUnit } from 'effector-react'

import { Box, Button, Divider, Flex, Skeleton, Textarea, TextInput, Title } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import { AccountLayout } from '@app/layouts'
import { $user, getUserFx, patchedUser, patchUserFx } from '@shared/store'

import { AvatarChange } from './avatar'
import { PersonalScheme } from './schema'

interface Form {
	about: string | null
	avatar: string
	city: string | null
	name: string
	surname: string
}

export const Personal = () => {
	const [user, loadingUser, updateUser, loadingUpdate] = useUnit([$user, getUserFx.$pending, patchedUser, patchUserFx.$pending])

	const form = useForm({
		mode: 'controlled',
		initialValues: { name: '', surname: '', avatar: '', about: '', city: '' },
		validate: zodResolver(PersonalScheme)
	})

	useEffect(() => {
		if (!loadingUser && user) {
			const surname = user.name?.split(' ')[1]
			const name = user.name?.split(' ')[0]

			form.setValues({
				name,
				surname,
				avatar: user.avatar_url,
				about: user.about ?? '',
				city: user.city ?? ''
			})
			form.setInitialValues({ name, surname, avatar: user.avatar_url, about: user.about ?? '', city: user.city ?? '' })
		}
	}, [user])

	// FIXME: Сделать вывод ошибок, пока лень
	const onClickForm = (values: Form) => {
		// loginError(form)
		const formData = new FormData()
		if ((values.avatar as any) instanceof File) formData.append('avatar_url', values.avatar)
		formData.append('name', `${values.name} ${values.surname}`)
		formData.append('about', values.about ?? '')
		formData.append('city', values.city ?? '')

		updateUser(formData)
		form.reset()
	}

	return (
		<AccountLayout>
			<form onSubmit={form.onSubmit((values) => onClickForm(values))}>
				{loadingUser && <Skeleton h='470px' mb={20} style={{ borderRadius: '10px' }} w='100%' />}
				{!loadingUser && (
					<>
						<AvatarChange form={form} />
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
								<Textarea
									label='Расскажите о немного о себе'
									radius='md'
									styles={{ input: { height: '180px' } }}
									w='48%'
									placeholder='Люблю занимать творчеством...'
									{...form.getInputProps('about')}
									mb={10}
								/>
							</Flex>
							<Flex w='100%' direction='column'>
								<TextInput label='Город' radius='md' w='48%' placeholder='Уфа' {...form.getInputProps('city')} />
							</Flex>
						</Box>
						<Divider mb={20} mt={20} w='100%' />
						<Flex justify='flex-end' w='100%'>
							<Button bg='rgb(64, 192, 87)' disabled={loadingUpdate || !form.isDirty()} radius='lg' type='submit'>
								Сохранить
							</Button>
						</Flex>
					</>
				)}
			</form>
		</AccountLayout>
	)
}
