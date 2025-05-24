import { useUnit } from 'effector-react'
import { Plus, Trash2 } from 'lucide-react'

import 'dayjs/locale/ru'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

import {
	Anchor,
	Badge,
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
	Tooltip,
	useMantineTheme
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'

import { BADGE_COLOR, ROLE } from '@shared/config'
import { ACCEPT, formatFileSize, ICON_MAP, isDarkMode, MAX_FILES, MIME_TO_READABLE_TYPE } from '@shared/helpers'
import { $user, $usersProject, $workspaceRole, updatedStatusTask, updatedTask } from '@shared/store'
import type { Files, TaskResponse } from '@shared/types'

export const UpdateTaskDrawer = ({ close, opened, task }: { close: () => void; opened: boolean; task: TaskResponse }) => {
	const [usersProject, { role }, updateStatusTask, user, updateTask] = useUnit([
		$usersProject,
		$workspaceRole,
		updatedStatusTask,
		$user,
		updatedTask
	])

	const isDark = isDarkMode()
	const theme = useMantineTheme()

	const [existingFiles, setExistingFiles] = useState<Files[]>([])
	const [removedFileIds, setRemovedFileIds] = useState<number[]>([])

	const form = useForm({
		mode: 'controlled',
		initialValues: {
			title: task.title || '',
			description: task.description || '',
			end_date: task.end_date ? new Date(task.end_date) : new Date(),
			assignees: task.users.map((u) => u.id.toString()),
			files: [] as File[]
		}
	})

	const onClickForm = (values: { title: string; description?: string; end_date: any; assignees: string[]; files: File[] }) => {
		const formData = new FormData()

		form.values.files.forEach((file) => {
			formData.append(`files[]`, file, file.name)
		})
		removedFileIds.forEach((id) => {
			formData.append('remove_files[]', id.toString())
		})

		values.assignees.forEach((id) => {
			formData.append('assignees[]', id)
		})
		formData.append('title', values.title)
		formData.append('description', values.description || '')
		if (values.end_date) formData.append('end_date', dayjs(values?.end_date).format('YYYY-MM-DD'))

		updateTask(formData)
		close()
		form.reset()
	}

	const handleStatusChange = (newStatus: string) => {
		updateStatusTask(newStatus)
		close()
	}

	const getExecutorButtons = () => {
		const buttons: { label: string; status: string; disabled?: boolean }[] = []

		switch (task.status) {
			case 'Назначена':
				buttons.push({ label: 'Взять в работу', status: 'Выполняется' })
				break
			case 'Выполняется':
				buttons.push({ label: 'Завершить задачу', status: 'Завершена' })
				buttons.push({ label: 'Приостановить задачу', status: 'Приостановлена' })
				break
			default:
				buttons.push({
					label: 'Возобновить задачу',
					status: 'Выполняется',
					disabled: task.status === 'Завершена' || task.status === 'Просрочена'
				})
				break
		}
		return buttons
	}

	useEffect(() => {
		if (opened) {
			setExistingFiles(task.files || [])
			setRemovedFileIds([])

			form.setValues({
				title: task.title || '',
				description: task.description || '',
				end_date: task.end_date ? new Date(task.end_date) : new Date(),
				assignees: task.users.map((u) => u.id.toString()) || [],
				files: []
			})
		}
	}, [opened, task])

	const clearFile = () => {
		form.setValues({ files: [] })
	}

	const handleRemoveExisting = (fileId: number) => {
		setExistingFiles((prev) => prev.filter((f) => f.id !== fileId))
		setRemovedFileIds((prev) => [...prev, fileId])
	}

	if (role === ROLE.EXECUTOR) {
		return (
			<Drawer
				radius='0 20px 20px 0'
				size='lg'
				styles={{ body: { padding: '20px' } }}
				onClose={() => {
					close()
				}}
				opened={opened}
				overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
				position='left'
				withCloseButton={false}
			>
				<Flex mb={10}>
					<Flex align='center' gap={10}>
						<Divider variant='dashed' orientation='vertical' />
						<Title c={isDark ? theme.colors.dark[3] : theme.colors.gray[7]} fw={500} size='18' order={1}>
							Задача (просмотр)
						</Title>
					</Flex>
					<Drawer.CloseButton />
				</Flex>
				<Divider mb={20} variant='dashed' />
				<Flex gap={14} mb={20} direction='column'>
					<Text fw={600} lh={1.55} mb={10} size='36'>
						{task.title}
					</Text>

					<Flex align='center'>
						<Flex align='center' w={160}>
							<Text c={theme.colors.gray[6]} fz={16}>
								Текущий статус
							</Text>
						</Flex>
						<Badge color={BADGE_COLOR[task.status as keyof typeof BADGE_COLOR]}>{task.status}</Badge>
					</Flex>

					<Flex>
						<Flex align='center' w={160}>
							<Text c={theme.colors.gray[6]} fz={16}>
								Дата начала
							</Text>
						</Flex>
						<Text>{task.start_date ? dayjs(task.start_date).format('DD.MM.YYYY') : '—'}</Text>
					</Flex>

					<Flex>
						<Flex align='center' w={160}>
							<Text c={theme.colors.gray[6]} fz={16}>
								Дата завершения
							</Text>
						</Flex>
						<Text>{task.end_date ? dayjs(task.end_date).format('DD.MM.YYYY') : '—'}</Text>
					</Flex>

					<Flex align='center'>
						<Flex align='center' w={160}>
							<Text c={theme.colors.gray[6]} fz={16}>
								Исполнители
							</Text>
						</Flex>
						<Flex gap={8}>
							{task.users.length > 0
								? task.users.map((u) => (
										<Badge key={u.id} color='gray'>
											{u.name}
										</Badge>
									))
								: '—'}
						</Flex>
					</Flex>

					<Flex>
						<Flex align='center' w={160}>
							<Text c={theme.colors.gray[6]} fz={16}>
								Вложения
							</Text>
						</Flex>
						<Flex gap={8} wrap='wrap'>
							{task.files && task.files.length > 0 ? (
								task.files.map((file) => (
									<Tooltip key={file.id} label={file.original_name} withArrow>
										<Anchor href={`${import.meta.env.VITE_BACKEND}/storage/${file.path}`} size='xs' download={file.original_name}>
											{ICON_MAP[file.mime_type as keyof typeof ICON_MAP]}
										</Anchor>
									</Tooltip>
								))
							) : (
								<Text>Нет вложений</Text>
							)}
						</Flex>
					</Flex>

					<Flex>
						<Flex align='center' w={160}>
							<Text c={theme.colors.gray[6]} fz={16}>
								Описание
							</Text>
						</Flex>
						<Text>{task.description}</Text>
					</Flex>

					{task.users.find((item) => item.id === user.id) && (
						<Flex gap={10} right={20} bottom={20} pos='absolute'>
							{getExecutorButtons().map((btn) => (
								<Button disabled={btn.disabled} key={btn.status} onClick={() => handleStatusChange(btn.status)}>
									{btn.label}
								</Button>
							))}
						</Flex>
					)}
				</Flex>
			</Drawer>
		)
	}

	return (
		<Drawer
			radius='0 20px 20px 0'
			size='lg'
			styles={{ body: { padding: '20px' } }}
			onClose={() => {
				form.reset()
				close()
			}}
			opened={opened}
			overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
			position='left'
			withCloseButton={false}
		>
			<Flex mb={10}>
				<Flex align='center' gap={10}>
					<Divider variant='dashed' orientation='vertical' />
					<Title c={isDark ? theme.colors.dark[3] : theme.colors.gray[7]} fw={500} size='18' order={1}>
						Задача
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
						<Flex align='center' w={160}>
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
								Текущий статус
							</Text>
						</Flex>
						<Badge color={BADGE_COLOR[task.status as keyof typeof BADGE_COLOR]}>{task.status}</Badge>
					</Flex>
					<Flex>
						<Flex align='center' w={160}>
							<Text c={theme.colors.gray[6]} fz={16}>
								Дата завершения
							</Text>
						</Flex>
						<DateInput
							w='calc(100% - 160px)'
							{...form.getInputProps('end_date')}
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
							<Text c={theme.colors.gray[6]} fz={16} miw={160} w={160}>
								Существующие вложения
							</Text>

							<Flex align='center' gap={10} mb={10} wrap='wrap'>
								{existingFiles.length > 0 ? (
									existingFiles.map((file) => (
										<Button
											h={55}
											key={file.original_name}
											maw={250}
											variant='default'
											leftSection={ICON_MAP[file.mime_type as keyof typeof ICON_MAP]}
											rightSection={
												<Button ml={4} size='xs' variant='gradient' onClick={() => handleRemoveExisting(file.id)}>
													<Trash2 size={14} />
												</Button>
											}
										>
											<Anchor
												href={`${import.meta.env.VITE_BACKEND}/storage/${file.path}`}
												size='xs'
												download={file.original_name}
											>
												<Flex align='flex-start' direction='column'>
													<Text fz='md'>{file.original_name}</Text>
													<Text c={theme.colors.gray[6]} fz={14}>
														{MIME_TO_READABLE_TYPE[file.mime_type as keyof typeof MIME_TO_READABLE_TYPE]}{' '}
														{formatFileSize(Number(file.size))}
													</Text>
												</Flex>
											</Anchor>
										</Button>
									))
								) : (
									<Text c={theme.colors.gray[6]} fz={14}>
										Нет существующих вложений
									</Text>
								)}
							</Flex>
						</Flex>

						<Flex align='center'>
							<Text c={theme.colors.gray[6]} fz={16} w={160}>
								Новые вложения
							</Text>
							<Button disabled={form.values.files.length === 0} variant='outline' w={210} color='red' onClick={clearFile}>
								Удалить новые вложения
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
									const newFiles = Array.from(selectedFiles)

									if (existingFiles.length + newFiles.length > MAX_FILES) return
									form.setValues({ files: selectedFiles })
								}}
							>
								{(props) => (
									<Button
										disabled={existingFiles.length + form.values.files.length >= MAX_FILES}
										h={55}
										variant='gradient'
										w={55}
										{...props}
									>
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
								styles={{ input: { minHeight: '100px', maxHeight: '180px' } }}
								placeholder='Описание задачи'
							/>
						</Tabs.Panel>
					</Tabs>
				</Flex>
				<Button right={20} type='submit' bottom={20} pos='absolute'>
					Обновить задачу
				</Button>
			</form>
		</Drawer>
	)
}
