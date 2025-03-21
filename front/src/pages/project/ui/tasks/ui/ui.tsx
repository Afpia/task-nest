import { useUnit } from 'effector-react'
import { Plus } from 'lucide-react'

import { Box, Button, Checkbox, Divider, Flex, Group, Skeleton, Table, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'
import { $tasks, getCurrentProjectFx, getTasksProjectFx } from '@shared/store'

import { CreateTaskDrawer } from './create-task-drawer'
import { Row } from './row-table'

export const Tasks = () => {
	const [tasks, tasksProjectLoading] = useUnit([$tasks, getTasksProjectFx.pending])
	const getCurrentProject = useUnit(getCurrentProjectFx)
	const [opened, { open, close }] = useDisclosure(false)
	const { isDark } = isDarkMode()

	return (
		<>
			<Box
				bd={`1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}`}
				h='100%'
				// mih='500px'
				p={20}
				style={{ borderRadius: '20px' }}
				w='100%'
			>
				<Flex align='center' justify='space-between'>
					<Group gap={8} justify='center'>
						<Button radius='md' size='xs' variant='default'>
							Таблица
						</Button>

						{/* <Button radius='md' size='xs' variant='default'>
							Канбан доска
						</Button> */}
					</Group>
					<Flex gap={10}>
						<Button radius='md' size='xs' variant='filled' leftSection={<Plus />} onClick={open}>
							Добавить задачу
						</Button>
					</Flex>
				</Flex>
				<Divider my='lg' variant='dashed' />
				{(tasksProjectLoading || getCurrentProject.pending) && (
					// <Flex align='center' h={300} justify='center' w='100%' pos='absolute'>
					// 	<Loading height={60} width={60} />
					// </Flex>
					<Skeleton height={250} style={{ borderRadius: '10px' }} width='100%' />
				)}
				{!(tasksProjectLoading || getCurrentProject.pending) && (
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
										<Table.Th w={300}>Назначенный</Table.Th>
										<Table.Th w={200}>Срок</Table.Th>
										<Table.Th w={200}>Статус</Table.Th>
										<Table.Th w={250}>Прогресс</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody mih={500}>
									<Row tasks={tasks} />
								</Table.Tbody>
							</Table>

							{tasks.length !== 0 && (
								<Flex
									align='center'
									h={40}
									pl={10}
									style={{ borderTop: `1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}` }}
								>
									{/*  eslint-disable-next-line style/jsx-one-expression-per-line */}
									<Text>{tasks.length} всего</Text>
								</Flex>
							)}
						</Table.ScrollContainer>
					</Box>
				)}
			</Box>
			<CreateTaskDrawer close={close} opened={opened} />
		</>
	)
}
