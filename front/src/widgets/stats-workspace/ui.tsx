import { useUnit } from 'effector-react'

import { Box, Divider, Flex, Skeleton, Text, Title, useMantineTheme } from '@mantine/core'

import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'
import { $projects, getProjectsWorkspaceFx, getUserWorkspacesFx } from '@shared/store'

import { $tasks, getWorkspaceTasksFx } from './model'

export const StatsWorkspace = () => {
	const theme = useMantineTheme()
	const { isDark } = isDarkMode()
	const [projects, projectsLoading, userWorkspacesLoading, countTasksLoading, tasks] = useUnit([
		$projects,
		getProjectsWorkspaceFx.$pending,
		getUserWorkspacesFx.$pending,
		getWorkspaceTasksFx.$pending,
		$tasks
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
							Всего проектов
						</Title>
						{(projectsLoading || userWorkspacesLoading) && <Skeleton height={30} width={140} />}
						{!(projectsLoading || userWorkspacesLoading) && (
							<Text c={projects.length === 0 ? `${theme.colors.gray[6]}` : ''} size='30px'>
								{projects.length}
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
							Всего задач
						</Title>
						{(countTasksLoading || userWorkspacesLoading) && <Skeleton height={30} width={140} />}
						{!(countTasksLoading || userWorkspacesLoading) && (
							<Text c={tasks.length === 0 ? `${theme.colors.gray[6]}` : ''} size='30px'>
								{tasks.length}
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
							Созданные проекты
						</Title>
						{(projectsLoading || userWorkspacesLoading) && <Skeleton height={30} width={140} />}
						{!(projectsLoading || userWorkspacesLoading) && (
							<Text
								c={projects.filter((item) => item.status === 'Создан').length === 0 ? `${theme.colors.gray[6]}` : ''}
								size='30px'
							>
								{projects.filter((item) => item.status === 'Создан').length}
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
							Заверш. проекты
						</Title>
						{(projectsLoading || userWorkspacesLoading) && <Skeleton height={30} width={140} />}
						{!(projectsLoading || userWorkspacesLoading) && (
							<Text
								c={projects.filter((item) => item.status === 'Завершён').length === 0 ? `${theme.colors.gray[6]}` : ''}
								size='30px'
							>
								{projects.filter((item) => item.status === 'Завершён').length}
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
							Проекты в работе
						</Title>
						{(projectsLoading || userWorkspacesLoading) && <Skeleton height={30} width={140} />}
						{!(projectsLoading || userWorkspacesLoading) && (
							<Text
								c={projects.filter((item) => item.status === 'В процессе').length === 0 ? `${theme.colors.gray[6]}` : ''}
								size='30px'
							>
								{projects.filter((item) => item.status === 'В процессе').length}
							</Text>
						)}
					</Flex>
				</Flex>
			</Flex>
		</Box>
	)
}
