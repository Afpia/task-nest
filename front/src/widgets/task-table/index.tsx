import { useUnit } from 'effector-react'
import { Plus } from 'lucide-react'

import { Box, Button, Checkbox, Divider, Flex, Group, Skeleton, Table, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'
import { $currentTask, $tasks, $workspaceRole, getCurrentProjectFx, getTasksProjectFx } from '@shared/store'
import { CreateTaskDrawer } from '@widgets/create-task-drawer'
import { UpdateTaskDrawer } from '@widgets/update-task-drawer'

import { Row } from './row-table'

export const Tasks = () => {
	const [tasks, tasksProjectLoading, currentProjectLoading, { role }, task] = useUnit([
		$tasks,
		getTasksProjectFx.$pending,
		getCurrentProjectFx.$pending,
		$workspaceRole,
		$currentTask
	])
	const createTask = useDisclosure(false)
	const updateTask = useDisclosure(false)
	const { isDark } = isDarkMode()

	return (
		<>
			<Box
				bd={`1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}`}
				h='100%'
				p={20}
				style={{ borderRadius: '20px' }}
				w='100%'
			>
				<Flex align='center' justify='space-between'>
					<Group gap={8} justify='center'>
						<Button radius='md' size='xs' variant='default'>
							Таблица
						</Button>
					</Group>
					{!(role === 'executor') && (
						<Flex gap={10}>
							<Button radius='md' size='xs' variant='filled' leftSection={<Plus />} onClick={createTask[1].open}>
								Добавить задачу
							</Button>
						</Flex>
					)}
				</Flex>
				<Divider my='lg' variant='dashed' />
				{(tasksProjectLoading || currentProjectLoading) && (
					<Skeleton height={250} style={{ borderRadius: '10px' }} width='100%' />
				)}
				{!(tasksProjectLoading || currentProjectLoading) && (
					<Box
						bd={`1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}`}
						style={{ borderRadius: '10px', overflow: 'hidden' }}
					>
						<Table.ScrollContainer mah={440} mih={90} minWidth={0} type='native'>
							<Table stickyHeader highlightOnHover>
								<Table.Thead bg={isDark ? ThemeColors.dark : ThemeColors.light}>
									<Table.Tr h={40}>
										<Table.Th w={20}>
											<Checkbox aria-label='Select row' />
										</Table.Th>
										<Table.Th w={250}>Название задачи</Table.Th>
										<Table.Th w={300}>Назначенные</Table.Th>
										<Table.Th w={100}>Начало</Table.Th>
										<Table.Th w={100}>Срок</Table.Th>
										<Table.Th w={200}>Статус</Table.Th>
										<Table.Th w={250}>Вложения</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody mih={500}>
									<Row tasks={tasks} updateTask={updateTask} />
								</Table.Tbody>
							</Table>

							{tasks.length !== 0 && (
								<Flex
									align='center'
									h={40}
									pl={10}
									style={{ borderTop: `1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}` }}
								>
									<Text>{tasks.length} всего</Text>
								</Flex>
							)}
						</Table.ScrollContainer>
					</Box>
				)}
			</Box>
			{task && <UpdateTaskDrawer task={task} close={updateTask[1].close} opened={updateTask[0]} />}
			<CreateTaskDrawer close={createTask[1].close} opened={createTask[0]} />
		</>
	)
}
