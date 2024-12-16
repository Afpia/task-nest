import { Flex } from '@mantine/core'

import { AddProjects } from '@widgets/add-projects'
import { AssignedTasks } from '@widgets/assigned-tasks'
import { People } from '@widgets/people'
import { TotalStats } from '@widgets/total'

export const Home = () => (
	<Flex direction='column' gap={20}>
		<TotalStats />
		<Flex justify='space-between' gap={20}>
			<AssignedTasks />
			<AddProjects />
		</Flex>
		<Flex justify='space-between' gap={20}>
			<People />
		</Flex>
	</Flex>
)
