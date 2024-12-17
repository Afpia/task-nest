import { useUnit } from 'effector-react'

import { Box, Divider, Flex, Text, Title, useMantineTheme } from '@mantine/core'

import { $projects, $tasks, $tasksUser } from '@shared/store'

export const TotalStats = () => {
	const theme = useMantineTheme()
	const [countProjects, countTasks, countUserTasks] = useUnit([$projects, $tasks, $tasksUser])

	return (
		<Box style={{ borderRadius: '16px' }} w='100%' h='120px' bd={`1px solid ${theme.colors.gray[3]}`}>
			<Flex w='100%' gap={30} p={20} align='center' h='100%'>
				<Flex w='20%' justify='space-between'>
					<Flex direction='column' align='start' h='100%' justify='center' gap={10}>
						<Title order={2} size={18} fw={600} c={theme.colors.gray[6]}>
							Всего проектов
						</Title>
						<Text size='30px' c={countProjects.length === 0 ? `${theme.colors.gray[6]}` : ''}>
							{countProjects.length}
						</Text>
					</Flex>
					<Divider orientation='vertical' variant='dashed' size={2} color={theme.colors.gray[3]} />
				</Flex>
				<Flex w='20%' justify='space-between'>
					<Flex direction='column' align='start' h='100%' justify='center' gap={10}>
						<Title order={2} size={18} fw={600} c={theme.colors.gray[6]}>
							Всего задач
						</Title>
						<Text size='30px' c={countTasks.length === 0 ? `${theme.colors.gray[6]}` : ''}>
							{countTasks.length}
						</Text>
					</Flex>
					<Divider orientation='vertical' variant='dashed' size={2} color={theme.colors.gray[3]} />
				</Flex>
				<Flex w='20%' justify='space-between'>
					<Flex direction='column' align='start' h='100%' justify='center' gap={10}>
						<Title order={2} size={18} fw={600} c={theme.colors.gray[6]}>
							Выпол. задачи
						</Title>
						<Text size='30px' c={theme.colors.gray[6]}>
							0
						</Text>
					</Flex>
					<Divider orientation='vertical' variant='dashed' size={2} color={theme.colors.gray[3]} />
				</Flex>
				<Flex w='20%' justify='space-between'>
					<Flex direction='column' align='start' h='100%' justify='center' gap={10}>
						<Title order={2} size={18} fw={600} c={theme.colors.gray[6]}>
							Просроч. задачи
						</Title>
						<Text size='30px' c={theme.colors.gray[6]}>
							0
						</Text>
					</Flex>
					<Divider orientation='vertical' variant='dashed' size={2} color={theme.colors.gray[3]} />
				</Flex>
				<Flex w='20%' justify='space-between'>
					<Flex direction='column' align='start' h='100%' justify='center' gap={10}>
						<Title order={2} size={18} fw={600} c={theme.colors.gray[6]}>
							Мои задачи
						</Title>
						<Text size='30px' c={countUserTasks.length === 0 ? `${theme.colors.gray[6]}` : ''}>
							{countUserTasks.length}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	)
}
