// eslint-disable-next-line simple-import-sort/imports
import { useUnit } from 'effector-react'
import { Maximize2, Minimize2, Plus } from 'lucide-react'

import 'dayjs/locale/ru'

import {
	Button,
	Divider,
	Drawer,
	FileButton,
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
import { useForm, zodResolver } from '@mantine/form'
import { useFullscreen } from '@mantine/hooks'

import { isDarkMode } from '@shared/helpers'
import { createdTask } from '@shared/store'

import { CreateTaskSchema, iconMap, MAX_FILES, mimeToReadableType } from '../../model'

export const CreateTaskDrawer = ({ close, opened }: { close: () => void; opened: boolean }) => {
	const [createTask] = useUnit([createdTask])
	const { toggle, fullscreen } = useFullscreen()

	const isDark = isDarkMode()
	const theme = useMantineTheme()

	const form = useForm({
		mode: 'controlled',
		initialValues: { title: '', description: '', end_date: '', tags: [], assignees: [], files: [] as File[] },
		validate: zodResolver(CreateTaskSchema)
	})

	const onClickForm = (values: {
		title: string
		description?: string
		end_date: any
		tags: string[]
		assignees: string[]
		files: File[]
	}) => {
		const formData = new FormData()
		form.values.files.forEach((f) => {
			formData.append(`file`, f)
		})
		console.log(values, formData)
		const formattedDate = values?.end_date?.toISOString().split('T')[0]
		createTask({
			title: values.title,
			description: values.description,
			end_date: formattedDate,
			// tags: values.tags,
			start_date: ''
		})
		close()
		form.reset()
	}

	const clearFile = () => {
		form.setValues({ files: [] })
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
						<Minimize2 color={isDark ? theme.colors.dark[3] : theme.colors.gray[7]} cursor='pointer' onClick={toggle} />
					) : (
						<Maximize2 color={isDark ? theme.colors.dark[3] : theme.colors.gray[7]} cursor='pointer' onClick={toggle} />
					)}
					<Divider variant='dashed' orientation='vertical' />
					<Title c={isDark ? theme.colors.dark[3] : theme.colors.gray[7]} fw={500} size='18' order={1}>
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
							data={[{ label: 'hello', value: 'hello' }]}
							variant='unstyled'
							w='calc(100% - 160px)'
							clearable
							searchable
							comboboxProps={{ shadow: 'md' }}
							{...form.getInputProps('assignees')}
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
							defaultDate={new Date()}
							minDate={new Date()}
							variant='unstyled'
							clearable
							locale='ru'
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
						<TagsInput
							{...form.getInputProps('tags')}
							maxTags={3}
							variant='unstyled'
							w='calc(100% - 160px)'
							clearable
							placeholder='Введите максимум 3 тэга'
						/>
					</Flex>
					<Flex gap={10} direction='column'>
						<Flex align='center'>
							<Text c={theme.colors.gray[6]} fz={16} w={160}>
								Вложения
							</Text>
							<Button disabled={form.values.files.length === 0} variant='outline' w={180} color='red' onClick={clearFile}>
								Удалить все файлы
							</Button>
						</Flex>
						<Flex gap={10} wrap='wrap'>
							{form.values.files.map((item) => (
								<Button
									h={55}
									key={item.name}
									maw={250}
									variant='default'
									leftSection={iconMap[item.type as keyof typeof iconMap]}
								>
									<Flex align='flex-start' direction='column'>
										<Text>{item.name}</Text>
										<Text c={theme.colors.gray[6]} fz={14}>
											{/*  eslint-disable-next-line style/jsx-one-expression-per-line */}
											{mimeToReadableType[item.type as keyof typeof mimeToReadableType]}{' '}
											{item.size < 1024 * 1024 && `${(item.size / 1024).toFixed(2)} КБ`}
										</Text>
									</Flex>
								</Button>
							))}
							<FileButton
								accept='application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/zip,application/x-rar-compressed,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
								multiple
								onChange={(selectedFiles) => {
									if (selectedFiles.length > MAX_FILES) return
									form.setValues({ files: selectedFiles })
								}}
							>
								{(props) => (
									<Button disabled={form.values.files.length === MAX_FILES} h={55} variant='gradient' w={55} {...props}>
										<Plus height={20} width={20} />
									</Button>
								)}
							</FileButton>
						</Flex>
					</Flex>
					<Tabs defaultValue='description'>
						<Tabs.List>
							<Tabs.Tab value='description'>Описание</Tabs.Tab>
							<Tabs.Tab value='comments'>Комментарии</Tabs.Tab>
						</Tabs.List>

						<Tabs.Panel mt={20} value='description'>
							<Textarea
								{...form.getInputProps('description')}
								resize='vertical'
								styles={{ input: { minHeight: '100px', maxHeight: '300px' } }}
								placeholder='Описание задачи'
							/>
						</Tabs.Panel>
						<Tabs.Panel value='comments'>hello1</Tabs.Panel>
					</Tabs>
				</Flex>
				<Button right={20} type='submit' bottom={20} pos='absolute'>
					Создать задачу
				</Button>
			</form>
		</Drawer>
	)
}
