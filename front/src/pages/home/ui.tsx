import { Flex, useMantineTheme } from '@mantine/core'
import { TotalStats } from '@widgets/total'

import styles from './ui.module.css'

export const Home = () => {
	return (
		<Flex>
			<TotalStats />
		</Flex>
	)
}
