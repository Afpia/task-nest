import { Flex } from '@mantine/core'

import { AddProjects } from '@widgets/add-projects'
import { TotalStats } from '@widgets/total'

export const Home = () => (
	<Flex direction='column' gap={20}>
		<TotalStats />
		<Flex>
			<AddProjects />
		</Flex>
	</Flex>
)
