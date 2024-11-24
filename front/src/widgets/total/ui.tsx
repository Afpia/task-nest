import { useUnit } from 'effector-react'

import { Box, Divider, Flex, Text, Title, useMantineTheme } from '@mantine/core'
import { $projects } from '@widgets/sidebar/model'

import { $countProjects } from './model'

import styles from './ui.module.css'

export const TotalStats = () => {
	const theme = useMantineTheme()
	const [countProjects] = useUnit([$projects])

	return (
		<Box className={styles.root}>
			<Flex w='100%' gap={30} p={20} align='center' h='100%'>
				<Flex w='20%' justify='space-between'>
					<Flex direction='column' align='start' h='100%' justify='center' gap={10}>
						<Title order={2} size={18} fw={600}>
							Всего проектов
						</Title>
						<Text size='30px'>{countProjects.length}</Text>
					</Flex>
					<Divider orientation='vertical' variant='dashed' size={2} color={theme.colors.gray[3]} />
				</Flex>
				<Flex w='20%' justify='space-between'>
					<Flex direction='column' align='start' h='100%' justify='center' gap={10}>
						<Title order={2} size={18} fw={600}>
							Всего задач
						</Title>
						<Text size='30px'>0</Text>
					</Flex>
					<Divider orientation='vertical' variant='dashed' size={2} color={theme.colors.gray[3]} />
				</Flex>
				<Flex w='20%' justify='space-between'>
					<Flex direction='column' align='start' h='100%' justify='center' gap={10}>
						<Title order={2} size={18} fw={600}>
							Выпол. задачи
						</Title>
						<Text size='30px'>0</Text>
					</Flex>
					<Divider orientation='vertical' variant='dashed' size={2} color={theme.colors.gray[3]} />
				</Flex>
				<Flex w='20%' justify='space-between'>
					<Flex direction='column' align='start' h='100%' justify='center' gap={10}>
						<Title order={2} size={18} fw={600}>
							Просроч. задачи
						</Title>
						<Text size='30px'>0</Text>
					</Flex>
					<Divider orientation='vertical' variant='dashed' size={2} color={theme.colors.gray[3]} />
				</Flex>
				<Flex w='20%' justify='space-between'>
					<Flex direction='column' align='start' h='100%' justify='center' gap={10}>
						<Title order={2} size={18} fw={600}>
							Мои задачи
						</Title>
						<Text size='30px'>0</Text>
					</Flex>
				</Flex>
			</Flex>
		</Box>
	)
}
