import { useUnit } from 'effector-react'

import { Box, Divider, Flex, Skeleton, Text, Title, useMantineTheme } from '@mantine/core'

import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'
import {
	$tasks,
	$tasksDone,
	$tasksInProgress,
	$tasksOverdue,
	$tasksSuspended,
	getCurrentProjectFx,
	getTasksProjectDoneFx,
	getTasksProjectFx,
	getTasksProjectInProgressFx,
	getTasksProjectOverdueFx,
	getTasksProjectSuspendedFx
} from '@shared/store'

export const TotalTaskStats = () => {
	const theme = useMantineTheme()
	const { isDark } = isDarkMode()
	const [
		countTasks,
		countTasksDone,
		countTasksOverdue,
		countTasksSuspended,
		countTasksInProgress,
		tasksProjectLoading,
		tasksProjectLoadingDone,
		tasksProjectLoadingOverdue,
		tasksProjectLoadingSuspended,
		tasksProjectLoadingInProgress,
		currentProjectLoading
	] = useUnit([
		$tasks,
		$tasksDone,
		$tasksOverdue,
		$tasksSuspended,
		$tasksInProgress,
		getTasksProjectFx.pending,
		getTasksProjectDoneFx.pending,
		getTasksProjectOverdueFx.pending,
		getTasksProjectSuspendedFx.pending,
		getTasksProjectInProgressFx.pending,
		getCurrentProjectFx.pending
	])

	return (
		<Box
			bd={`1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}`}
			h='120px'
			style={{ borderRadius: '16px' }}
			w='100%'
		>
			<Flex align='center' gap={30} h='100%' p={20} w='100%'>
				<Flex justify='space-between' w='20%'>
					<Flex align='start' gap={8} h='100%' justify='space-between' mih={67} direction='column'>
						<Title c={theme.colors.gray[6]} fw={600} size={18} order={2}>
							Всего задач
						</Title>
						{(tasksProjectLoading || currentProjectLoading) && <Skeleton height={30} width={140} />}
						{!(tasksProjectLoading || currentProjectLoading) && (
							<Text c={countTasks.length === 0 ? `${theme.colors.gray[6]}` : ''} size='30px'>
								{countTasks.length}
							</Text>
						)}
					</Flex>
					<Divider
						size={2}
						variant='dashed'
						color={isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}
						orientation='vertical'
					/>
				</Flex>
				<Flex justify='space-between' w='20%'>
					<Flex align='start' gap={8} h='100%' justify='space-between' mih={67} direction='column'>
						<Title c={theme.colors.gray[6]} fw={600} size={18} order={2}>
							Приост. задачи
						</Title>
						{(tasksProjectLoadingSuspended || currentProjectLoading) && <Skeleton height={30} width={140} />}
						{!(tasksProjectLoadingSuspended || currentProjectLoading) && (
							<Text c={countTasksSuspended.length === 0 ? `${theme.colors.gray[6]}` : ''} size='30px'>
								{countTasksSuspended.length}
							</Text>
						)}
					</Flex>
					<Divider
						size={2}
						variant='dashed'
						color={isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}
						orientation='vertical'
					/>
				</Flex>
				<Flex justify='space-between' w='20%'>
					<Flex align='start' gap={8} h='100%' justify='space-between' mih={67} direction='column'>
						<Title c={theme.colors.gray[6]} fw={600} size={18} order={2}>
							Задачи в работе
						</Title>
						{(tasksProjectLoadingInProgress || currentProjectLoading) && <Skeleton height={30} width={140} />}
						{!(tasksProjectLoadingInProgress || currentProjectLoading) && (
							<Text c={countTasksInProgress.length === 0 ? `${theme.colors.gray[6]}` : ''} size='30px'>
								{countTasksInProgress.length}
							</Text>
						)}
					</Flex>
					<Divider
						size={2}
						variant='dashed'
						color={isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}
						orientation='vertical'
					/>
				</Flex>
				<Flex justify='space-between' w='20%'>
					<Flex align='start' gap={8} h='100%' justify='space-between' mih={67} direction='column'>
						<Title c={theme.colors.gray[6]} fw={600} size={18} order={2}>
							Выпол. задачи
						</Title>
						{(tasksProjectLoadingDone || currentProjectLoading) && <Skeleton height={30} width={140} />}
						{!(tasksProjectLoadingDone || currentProjectLoading) && (
							<Text c={countTasksDone.length === 0 ? `${theme.colors.gray[6]}` : ''} size='30px'>
								{countTasksDone.length}
							</Text>
						)}
					</Flex>
					<Divider
						size={2}
						variant='dashed'
						color={isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}
						orientation='vertical'
					/>
				</Flex>
				<Flex justify='space-between' w='20%'>
					<Flex align='start' gap={8} h='100%' justify='space-between' mih={67} direction='column'>
						<Title c={theme.colors.gray[6]} fw={600} size={18} order={2}>
							Просроч. задачи
						</Title>
						{(tasksProjectLoadingOverdue || currentProjectLoading) && <Skeleton height={30} width={140} />}
						{!(tasksProjectLoadingOverdue || currentProjectLoading) && (
							<Text c={countTasksOverdue.length === 0 ? `${theme.colors.gray[6]}` : ''} size='30px'>
								{countTasksOverdue.length}
							</Text>
						)}
					</Flex>
				</Flex>
			</Flex>
		</Box>
	)
}
