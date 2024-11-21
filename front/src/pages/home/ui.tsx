import { Flex, useMantineTheme } from '@mantine/core'
import { AddProjects } from '@widgets/add-projects'
import { TotalStats } from '@widgets/total'

import styles from './ui.module.css'

export const Home = () => (
	<Flex direction='column' gap={20}>
		<TotalStats />
		<Flex>
			<AddProjects />
		</Flex>
	</Flex>
)
