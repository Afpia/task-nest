import { useUnit } from 'effector-react'

import { Box, Divider, Flex, Skeleton, Text, Title, useMantineTheme } from '@mantine/core'

import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'
import { $tasks, getCurrentProjectFx, getTasksProjectFx } from '@shared/store'

export const TotalTaskStats = () => {
	const theme = useMantineTheme()
	const { isDark } = isDarkMode()
	const [countTasks, tasksProjectLoading, currentProjectLoading] = useUnit([
		$tasks,
		getTasksProjectFx.pending,
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
						<Text c={theme.colors.gray[6]} size='30px'>
							0
						</Text>
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
						<Text c={theme.colors.gray[6]} size='30px'>
							0
						</Text>
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
						<Text c={theme.colors.gray[6]} size='30px'>
							0
						</Text>
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
						<Text c={theme.colors.gray[6]} size='30px'>
							0
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	)
}
