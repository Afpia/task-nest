import { Flex } from '@mantine/core'

import { AddProjects } from '@widgets/add-projects'
import { AssignedTasks } from '@widgets/assigned-tasks'
import { People } from '@widgets/people'
import { PrivateChat } from '@widgets/private-chat'
import { TotalStats } from '@widgets/total'

export const Home = () => (
	<Flex gap={20} direction='column'>
		<TotalStats />
		<Flex gap={20} justify='space-between'>
			<AssignedTasks />
			<AddProjects />
		</Flex>
		<Flex gap={20} justify='space-between'>
			<People />
			<PrivateChat />
		</Flex>
	</Flex>
)
