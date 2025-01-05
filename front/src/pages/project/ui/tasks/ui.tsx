import { useUnit } from 'effector-react'
import { CalendarFold, ChevronDown, FolderPen, Maximize2, Minimize2, Plus, Scroll, Settings2, Users } from 'lucide-react'

import {
	ActionIcon,
	Avatar,
	Badge,
	Box,
	Button,
	Checkbox,
	Divider,
	Drawer,
	Flex,
	Group,
	Input,
	MultiSelect,
	Progress,
	Table,
	Text,
	Textarea,
	Title
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { useDisclosure, useFullscreen } from '@mantine/hooks'

import { $username } from '@shared/auth'
import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'
import { $tasks, createdTask } from '@shared/store'

export const Tasks = () => {
	const [tasks, user, createTask] = useUnit([$tasks, $username, createdTask])
	const [opened, { open, close }] = useDisclosure(false)
	const { toggle, fullscreen } = useFullscreen()
	const { isDark } = isDarkMode()

	const rows = tasks.map((element) => (
		<Table.Tr h={50} key={element.id}>
			<Table.Td>
				<Checkbox aria-label='Select row' />
			</Table.Td>
			<Table.Td>
				<Text>{element.title}</Text>
			</Table.Td>
			<Table.Td>
				<Flex align='center' gap={8}>
					<Avatar size={30} src={element.users[0].avatar_url} />
					<Text fw='bold' fz={14}>
						{element.users.map((username) => username.name).join(', ')}
					</Text>
				</Flex>
			</Table.Td>
			<Table.Td>{element.end_date}</Table.Td>
			<Table.Td>
				<Badge color={element.status === 'Завершена' ? 'lime' : 'blue'}>{element.status}</Badge>
			</Table.Td>
			<Table.Td>
				<Flex gap={20} justify='space-between'>
					<Flex align='center' gap={60}>
						<Text fw='bold'>0%</Text>
						<Progress value={0} w={100} />
					</Flex>
					<ActionIcon aria-label='Settings' h='100%' variant='default' w='30px'>
						<ChevronDown style={{ width: '70%', height: '70%' }} />
					</ActionIcon>
				</Flex>
			</Table.Td>
		</Table.Tr>
	))

	const form = useForm({
		mode: 'controlled',
		initialValues: { title: '', description: '', end_date: '' }
		// validate: zodResolver(LoginScheme)
	})

	const onClickForm = (values: { title?: string; description?: string; end_date: any }) => {
		// loginError(form)
		const formattedDate = values.end_date.toISOString().split('T')[0]

		createTask({ title: values.title, description: values.description, end_date: formattedDate })
	}

	return (
		<>
			<Box bd='1px solid #D9D9D9' h='100%' mih='500px' p={20} style={{ borderRadius: '20px' }} w='100%'>
				<Flex align='center' justify='space-between'>
					<Group gap={8} justify='center'>
						<Button radius='md' size='xs' variant='filled'>
							Таблица
						</Button>

						<Button radius='md' size='xs' variant='default'>
							Канбан доска
						</Button>
					</Group>
					<Flex gap={10}>
						<Button radius='md' size='xs' variant='filled' leftSection={<Plus />} onClick={open}>
							Добавить
						</Button>
						<ActionIcon aria-label='Settings' h='100%' variant='default' w='30px'>
							<Settings2 style={{ width: '70%', height: '70%' }} />
						</ActionIcon>
					</Flex>
				</Flex>
				<Divider my='lg' variant='dashed' />
				<Box bd='1px solid #D9D9D9' style={{ borderRadius: '10px', overflow: 'hidden' }}>
					<Table stickyHeader highlightOnHover>
						<Table.Thead bg={isDark ? ThemeColors.dark : ThemeColors.light}>
							<Table.Tr h={40}>
								<Table.Th w={20}>
									<Checkbox aria-label='Select row' />
								</Table.Th>
								<Table.Th w={350}>Название задачи</Table.Th>
								<Table.Th w={350}>Назначенный</Table.Th>
								<Table.Th w={250}>Срок</Table.Th>
								<Table.Th w={200}>Статус</Table.Th>
								<Table.Th>Прогресс</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{rows}</Table.Tbody>
					</Table>
				</Box>
			</Box>
			<Drawer
				radius='20px 0 0 20px'
				size='lg'
				onClose={close}
				opened={opened}
				overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
				position='right'
				withCloseButton={false}
			>
				<Flex mb={10}>
					<Flex align='center' gap={10}>
						{fullscreen ? <Minimize2 cursor='pointer' onClick={toggle} /> : <Maximize2 cursor='pointer' onClick={toggle} />}
						<Divider variant='dashed' orientation='vertical' />
					</Flex>
					<Drawer.CloseButton />
				</Flex>
				<Divider mb={20} variant='dashed' />
				<Title mb={20}>Создание задачи</Title>
				<form onSubmit={form.onSubmit((values) => onClickForm(values))}>
					<Flex gap={20} mb={20} direction='column'>
						<Flex>
							<Flex align='center' gap={8} w={160}>
								<FolderPen />
								<Text fz={14}>Название задачи</Text>
							</Flex>
							<Input {...form.getInputProps('title')} placeholder='Название задачи' />
						</Flex>
						<Flex>
							<Flex align='center' gap={8} w={160}>
								<CalendarFold />
								<Text fz={14}>Дата завершения</Text>
							</Flex>
							<DateInput
								{...form.getInputProps('end_date')}
								variant='default'
								placeholder='Дата завершения'
								valueFormat='YYYY-MM-DD'
							/>
						</Flex>
						<Flex>
							<Flex align='center' gap={8} w={160}>
								<Users />
								<Text fz={14}>Назначенные</Text>
							</Flex>
							<MultiSelect data={[user]} placeholder='Назначенные' />
						</Flex>
						<Flex direction='column'>
							<Flex align='center' gap={8} mb={10} w={160}>
								<Scroll />
								<Text fz={14}>Описание</Text>
							</Flex>
							<Textarea {...form.getInputProps('description')} placeholder='Описание задачи' />
						</Flex>
					</Flex>
					<Button type='submit'>Создать задачу</Button>
				</form>
			</Drawer>
		</>
	)
}
