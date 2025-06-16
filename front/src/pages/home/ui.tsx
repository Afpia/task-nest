import { Flex } from '@mantine/core'

import { AddProjects } from '@widgets/add-projects'
import { AssignedTasks } from '@widgets/assigned-tasks'
import { People } from '@widgets/people'
import { ProjectsStats } from '@widgets/projects-stats'
import { StatsWorkspace } from '@widgets/stats-workspace'

export const Home = () => (
	<Flex gap={20} direction='column'>
		<StatsWorkspace />
		<Flex gap={20} justify='space-between'>
			<AssignedTasks />
			<AddProjects />
		</Flex>
		<Flex gap={20} justify='space-between'>
			<People />
			<ProjectsStats />
		</Flex>
	</Flex>
)
