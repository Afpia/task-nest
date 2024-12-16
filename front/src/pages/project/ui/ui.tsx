import { Tabs } from '@mantine/core'

import { TotalStats } from '@widgets/total'

import { Tasks } from './tasks'

export const Project = () => {
	return (
		<>
			<TotalStats />
			<Tabs defaultValue='tasks' mt={30}>
				<Tabs.List mb={20}>
					<Tabs.Tab value='tasks'>Задачи</Tabs.Tab>
					<Tabs.Tab value='members'>Участники</Tabs.Tab>
					<Tabs.Tab value='discussions'>Обсуждения</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value='tasks'>
					<Tasks />
				</Tabs.Panel>

				<Tabs.Panel value='members'></Tabs.Panel>

				<Tabs.Panel value='discussions'></Tabs.Panel>
			</Tabs>
		</>
	)
}
