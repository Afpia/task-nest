import { useUnit } from 'effector-react'
import { Maximize2, Minimize2, Plus } from 'lucide-react'

import 'dayjs/locale/ru'

import dayjs from 'dayjs'

import {
	Button,
	Divider,
	Drawer,
	FileButton,
	Flex,
	Input,
	MultiSelect,
	Tabs,
	Text,
	Textarea,
	Title,
	useMantineTheme
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm, zodResolver } from '@mantine/form'
import { useFullscreen } from '@mantine/hooks'

import { ROLE } from '@shared/config'
import { ACCEPT, formatFileSize, ICON_MAP, isDarkMode, MAX_FILES, MIME_TO_READABLE_TYPE } from '@shared/helpers'
import { $usersProject, createdTask } from '@shared/store'

import { CreateTaskSchema } from './model'

export const CreateTaskDrawer = ({ close, opened }: { close: () => void; opened: boolean }) => {
	const [createTask, usersProject] = useUnit([createdTask, $usersProject])
	const { toggle, fullscreen } = useFullscreen()

	const isDark = isDarkMode()
	const theme = useMantineTheme()

	const form = useForm({
		mode: 'controlled',
		initialValues: { title: '', description: '', end_date: new Date(), assignees: [], files: [] as File[] },
		validate: zodResolver(CreateTaskSchema)
	})

	const onClickForm = (values: { title: string; description?: string; end_date: any; assignees: string[]; files: File[] }) => {
		const formData = new FormData()
		form.values.files.forEach((file) => {
			formData.append(`files[]`, file, file.name)
		})
		values.assignees.forEach((id) => {
			formData.append('assignees[]', id)
		})
		formData.append('title', values.title)
		formData.append('description', values.description || '')
		if (values.end_date) formData.append('end_date', dayjs(values?.end_date).format('YYYY-MM-DD'))
		formData.append('start_date', dayjs(new Date()).format('YYYY-MM-DD'))

		createTask(formData)
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
							variant='unstyled'
							w='calc(100% - 160px)'
							clearable
							searchable
							data={usersProject
								.filter((item) => item.pivot.role !== ROLE.PROJECT_MANAGER)
								.map((item) => ({ label: item.name, value: item.id.toString() }))}
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
							// defaultDate={new Date()}
							minDate={new Date()}
							variant='unstyled'
							clearable
							locale='ru'
							placeholder='Дата завершения'
							valueFormat='YYYY-MM-DD'
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
									leftSection={ICON_MAP[item.type as keyof typeof ICON_MAP]}
								>
									<Flex align='flex-start' direction='column'>
										<Text>{item.name}</Text>
										<Text c={theme.colors.gray[6]} fz={14}>
											{MIME_TO_READABLE_TYPE[item.type as keyof typeof MIME_TO_READABLE_TYPE]} {formatFileSize(item.size)}
										</Text>
									</Flex>
								</Button>
							))}
							<FileButton
								accept={ACCEPT}
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
						</Tabs.List>

						<Tabs.Panel mt={20} value='description'>
							<Textarea
								{...form.getInputProps('description')}
								resize='vertical'
								styles={{ input: { minHeight: '100px', maxHeight: '300px' } }}
								placeholder='Описание задачи'
							/>
						</Tabs.Panel>
					</Tabs>
				</Flex>
				<Button right={20} type='submit' bottom={20} pos='absolute'>
					Создать задачу
				</Button>
			</form>
		</Drawer>
	)
}
