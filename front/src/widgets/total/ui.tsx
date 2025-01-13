import { useUnit } from 'effector-react'

import { Box, Divider, Flex, Skeleton, Text, Title, useMantineTheme } from '@mantine/core'

import { Loading } from '@app/assets/svg'
import { Loading2 } from '@app/assets/svg/loading-2'
import { $projects, $tasks, $tasksUser, getProjectsWorkspaceFx, getUserWorkspacesFx } from '@shared/store'

export const TotalStats = () => {
	const theme = useMantineTheme()
	const [countProjects, countProjectsLoading, userWorkspacesLoading, countTasks, countUserTasks] = useUnit([
		$projects,
		getProjectsWorkspaceFx.pending,
		getUserWorkspacesFx.pending,
		$tasks,
		$tasksUser
	])

	return (
		<Box bd={`1px solid ${theme.colors.gray[3]}`} h='120px' style={{ borderRadius: '16px' }} w='100%'>
			<Flex align='center' gap={30} h='100%' p={20} w='100%'>
				<Flex justify='space-between' w='20%'>
					<Flex align='start' gap={8} h='100%' justify='space-between' mih={67} direction='column'>
						<Title c={theme.colors.gray[6]} fw={600} size={18} order={2}>
							Всего проектов
						</Title>
						<Text c={countProjects.length === 0 ? `${theme.colors.gray[6]}` : ''} size='30px'>
							{(countProjectsLoading || userWorkspacesLoading) && <Skeleton height={30} width={140} />}
							{!(countProjectsLoading || userWorkspacesLoading) && countProjects.length}
						</Text>
					</Flex>
					<Divider size={2} variant='dashed' color={theme.colors.gray[3]} orientation='vertical' />
				</Flex>
				<Flex justify='space-between' w='20%'>
					<Flex align='start' gap={8} h='100%' justify='space-between' mih={67} direction='column'>
						<Title c={theme.colors.gray[6]} fw={600} size={18} order={2}>
							Всего задач
						</Title>
						<Text c={countTasks.length === 0 ? `${theme.colors.gray[6]}` : ''} size='30px'>
							{countTasks.length}
						</Text>
					</Flex>
					<Divider size={2} variant='dashed' color={theme.colors.gray[3]} orientation='vertical' />
				</Flex>
				<Flex justify='space-between' w='20%'>
					<Flex align='start' gap={8} h='100%' justify='space-between' mih={67} direction='column'>
						<Title c={theme.colors.gray[6]} fw={600} size={18} order={2}>
							Выпол. задачи
						</Title>
						<Text c={theme.colors.gray[6]} size='30px'>
							0
						</Text>
					</Flex>
					<Divider size={2} variant='dashed' color={theme.colors.gray[3]} orientation='vertical' />
				</Flex>
				<Flex justify='space-between' w='20%'>
					<Flex align='start' gap={8} h='100%' justify='space-between' mih={67} direction='column'>
						<Title c={theme.colors.gray[6]} fw={600} size={18} order={2}>
							Просроч. задачи
						</Title>
						<Text c={theme.colors.gray[6]} size='30px'>
							0
						</Text>
					</Flex>
					<Divider size={2} variant='dashed' color={theme.colors.gray[3]} orientation='vertical' />
				</Flex>
				<Flex justify='space-between' w='20%'>
					<Flex align='start' gap={8} h='100%' justify='space-between' mih={67} direction='column'>
						<Title c={theme.colors.gray[6]} fw={600} size={18} order={2}>
							Мои задачи
						</Title>
						<Text c={countUserTasks.length === 0 ? `${theme.colors.gray[6]}` : ''} size='30px'>
							{countUserTasks.length}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	)
}
