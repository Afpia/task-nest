import { useUnit } from 'effector-react'
import { CalendarFold, FolderPen, Maximize2, Minimize2, Scroll, Users } from 'lucide-react'

import {
	Box,
	Button,
	Divider,
	Drawer,
	FileInput,
	Flex,
	Input,
	MultiSelect,
	Tabs,
	TagsInput,
	Text,
	Textarea,
	Title,
	useMantineTheme
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useFullscreen } from '@mantine/hooks'

import { createdTask } from '@shared/store'

export const CreateTaskDrawer = ({ close, opened }: { close: () => void; opened: boolean }) => {
	const [createTask] = useUnit([createdTask])
	const { toggle, fullscreen } = useFullscreen()
	const theme = useMantineTheme()

	const form = useForm({
		mode: 'controlled',
		initialValues: { title: '', description: '', end_date: '' }
	})

	// TODO: Добавить валидацию

	const onClickForm = (values: { title: string; description?: string; end_date: any }) => {
		const formattedDate = values.end_date.toISOString().split('T')[0]
		close()
		createTask({
			title: values.title,
			description: values.description,
			end_date: formattedDate,
			start_date: ''
		})
		form.reset()
	}

	return (
		<Drawer
			radius='20px 0 0 20px'
			size='lg'
			styles={{ body: { padding: '20px' } }}
			onClose={close}
			opened={opened}
			overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
			position='right'
			withCloseButton={false}
		>
			<Flex mb={10}>
				<Flex align='center' gap={10}>
					{/*  eslint-disable-next-line style/multiline-ternary */}
					{fullscreen ? (
						<Minimize2 color={theme.colors.gray[7]} cursor='pointer' onClick={toggle} />
					) : (
						<Maximize2 color={theme.colors.gray[7]} cursor='pointer' onClick={toggle} />
					)}
					<Divider variant='dashed' orientation='vertical' />
					<Title c={theme.colors.gray[7]} fw={500} size='18' order={1}>
						Создание новой задачи
					</Title>
				</Flex>
				<Drawer.CloseButton />
			</Flex>
			<Divider mb={20} variant='dashed' />
			<form onSubmit={form.onSubmit((values) => onClickForm(values))}>
				<Flex gap={14} mb={20} direction='column'>
					<Input
						fw={600}
						mb={10}
						size='36'
						styles={{ input: { height: '50px' } }}
						variant='unstyled'
						w='100%'
						{...form.getInputProps('title')}
						placeholder='Введите название задачи'
					/>
					<Flex>
						<Flex align='center' gap={8} w={160}>
							<Text c={theme.colors.gray[6]} fz={16}>
								Назначенные
							</Text>
						</Flex>
						<MultiSelect
							variant='unstyled'
							w='calc(100% - 160px)'
							clearable
							searchable
							comboboxProps={{ shadow: 'md' }}
							hidePickedOptions
							nothingFoundMessage='Такого пользователя нет'
							placeholder='Назначить человека'
						/>
					</Flex>
					<Flex>
						<Flex align='center' gap={8} w={160}>
							<Text c={theme.colors.gray[6]} fz={16}>
								Дата завершения
							</Text>
						</Flex>
						<DateInput
							w='calc(100% - 160px)'
							{...form.getInputProps('end_date')}
							variant='unstyled'
							placeholder='Дата завершения'
							valueFormat='YYYY-MM-DD'
						/>
					</Flex>
					<Flex>
						<Flex align='center' gap={8} w={160}>
							<Text c={theme.colors.gray[6]} fz={16}>
								Тэги
							</Text>
						</Flex>
						<TagsInput maxTags={3} variant='unstyled' w='calc(100% - 160px)' clearable placeholder='Введите максимум 3 тэга' />
					</Flex>
					<Tabs defaultValue='description'>
						<Tabs.List>
							<Tabs.Tab value='description'>Описание</Tabs.Tab>
							<Tabs.Tab value='comments'>Комментарии</Tabs.Tab>
							<Tabs.Tab value='settings'>Settings</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel mt={20} value='description'>
							<Textarea
								{...form.getInputProps('description')}
								resize='vertical'
								styles={{ input: { minHeight: '200px', maxHeight: '400px' } }}
								placeholder='Описание задачи'
							/>
						</Tabs.Panel>

						<Tabs.Panel value='comments'>Messages tab content</Tabs.Panel>

						<Tabs.Panel value='settings'>Settings tab content</Tabs.Panel>
					</Tabs>
					<Flex>
						<Flex align='center' gap={8} w={160}>
							<Text c={theme.colors.gray[6]} fz={16}>
								Вложения
							</Text>
						</Flex>
						<FileInput placeholder='Загрузить файлы' />
					</Flex>
				</Flex>
				<Button right={20} type='submit' bottom={20} pos='absolute'>
					Создать задачу
				</Button>
			</form>
		</Drawer>
	)
}
