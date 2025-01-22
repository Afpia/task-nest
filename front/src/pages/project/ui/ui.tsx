import { useUnit } from 'effector-react'
import { UserRoundPlus } from 'lucide-react'

import { Avatar, Button, Flex, Skeleton, Tabs, Title } from '@mantine/core'

import { $currentProject, getCurrentProjectFx } from '@shared/store'
import { TotalTaskStats } from '@widgets/total-task'

import { Tasks } from './tasks'

export const Project = () => {
	const [{ project }, currentProjectLoading] = useUnit([$currentProject, getCurrentProjectFx.pending])

	return (
		<>
			<Flex align='center' justify='space-between' mb={20} w='100%'>
				<Flex align='center' gap={16}>
					{!currentProjectLoading && (
						<>
							<Avatar radius='md' src={project.image_url} />
							<Title order={3}>{project.title}</Title>
						</>
					)}
					{currentProjectLoading && <Skeleton height={38} width={250} />}
				</Flex>
				<Button variant='light' leftSection={<UserRoundPlus />}>
					Пригласить на проект
				</Button>
			</Flex>

			<TotalTaskStats />
			<Tabs defaultValue='tasks' mt={30}>
				<Tabs.List mb={20}>
					<Tabs.Tab value='tasks'>Задачи</Tabs.Tab>
					<Tabs.Tab value='members'>Участники</Tabs.Tab>
					<Tabs.Tab value='discussions'>Обсуждения</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value='tasks'>
					<Tasks />
				</Tabs.Panel>

				<Tabs.Panel value='members'>hello1</Tabs.Panel>

				<Tabs.Panel value='discussions'>hello2</Tabs.Panel>
			</Tabs>
		</>
	)
}
