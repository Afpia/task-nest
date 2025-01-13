import { Tabs } from '@mantine/core'

import { TotalTaskStats } from '@widgets/total-task'

import { Tasks } from './tasks'

export const Project = () => (
	<>
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
