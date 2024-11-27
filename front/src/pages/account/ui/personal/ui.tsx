import { AccountLayout } from '@app/layouts'
import { Box, Button, Divider, Flex, Select, Text, Textarea, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'

import { AvatarChange } from './avatar'

interface Form {
	name: string
	surname: string
	avatar: string
	about: string
	pronouns: string
}

export const Personal = () => {
	const form = useForm({
		mode: 'controlled',
		initialValues: { name: '', surname: '', avatar: '', about: '', pronouns: 'Не важно' }
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
				<AvatarChange form={form} />
				<Box>
					<Flex w='100%' justify='space-between'>
						<Title mb={10} order={3} size={14} fw={600}>
							Полное имя
						</Title>
					</Flex>
					<Flex w='100%' align='start' h='100%' justify='start' gap={20}>
						<TextInput radius='md' w='48%' label='Имя' {...form.getInputProps('name')} />
						<TextInput radius='md' w='48%' label='Фамилия' {...form.getInputProps('surname')} />
					</Flex>
				</Box>
				<Divider w='100%' mb={20} mt={20} />
				<Box>
					<Flex w='100%' direction='column'>
						<Title mb={10} order={3} size={14} fw={600}>
							О себе
						</Title>
						<Text size='14px' mb={14}>
							Расскажите о немного о себе
						</Text>
						<Textarea w='48%' {...form.getInputProps('about')} />
					</Flex>
				</Box>
				<Divider w='100%' mb={20} mt={20} />
				<Box>
					<Flex w='100%' direction='column'>
						<Title mb={10} order={3} size={14} fw={600}>
							Произношение
						</Title>
						<Select
							w='48%'
							allowDeselect={false}
							data={['Не важно', 'он/его', 'она/её', 'они/их']}
							{...form.getInputProps('pronouns')}
						/>
					</Flex>
				</Box>
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
