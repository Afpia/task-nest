import { useUnit } from 'effector-react'
import { CalendarFold, ChevronDown, FolderPen, Maximize2, Minimize2, Plus, Scroll, Settings2, Users } from 'lucide-react'

import { ActionIcon, Avatar, Badge, Box, Button, Checkbox, Divider, Flex, Group, Progress, Table, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { Loading } from '@app/assets/svg'
import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'
import { $tasks, getCurrentProjectFx, getTasksProjectFx } from '@shared/store'

import { CreateTaskDrawer } from './create-task-drawer'

export const Tasks = () => {
	const [tasks, tasksProjectLoading, currentProjectLoading] = useUnit([
		$tasks,
		getTasksProjectFx.pending,
		getCurrentProjectFx.pending
	])
	const [opened, { open, close }] = useDisclosure(false)
	const { isDark } = isDarkMode()

	const rows = tasks.map((element) => (
		<Table.Tr h={50} key={element.id}>
			<Table.Td>
				<Checkbox aria-label='Select row' />
			</Table.Td>
			<Table.Td>
				<Text>{element.title}</Text>
			</Table.Td>
			<Table.Td width={200}>
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

	return (
		<>
			<Box
				bd={`1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}`}
				h='100%'
				mih='500px'
				p={20}
				style={{ borderRadius: '20px' }}
				w='100%'
			>
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
				<Box
					bd={`1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}`}
					style={{ borderRadius: '10px', overflow: 'hidden' }}
				>
					<Table.ScrollContainer mah={500} mih={90} minWidth={0} type='native'>
						<Table stickyHeader highlightOnHover>
							<Table.Thead bg={isDark ? ThemeColors.dark : ThemeColors.light}>
								<Table.Tr h={40}>
									<Table.Th w={20}>
										<Checkbox aria-label='Select row' />
									</Table.Th>
									<Table.Th w={250}>Название задачи</Table.Th>
									<Table.Th w={300}>Назначенный</Table.Th>
									<Table.Th w={200}>Срок</Table.Th>
									<Table.Th w={200}>Статус</Table.Th>
									<Table.Th w={250}>Прогресс</Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody mih={500}>{!(tasksProjectLoading || currentProjectLoading) && rows}</Table.Tbody>
						</Table>
						{(tasksProjectLoading || currentProjectLoading) && (
							<Flex align='center' h={300} justify='center' w='100%' pos='absolute'>
								<Loading height={60} width={60} />
							</Flex>
						)}
					</Table.ScrollContainer>
				</Box>
			</Box>
			<CreateTaskDrawer close={close} opened={opened} />
		</>
	)
}
