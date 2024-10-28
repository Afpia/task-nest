import { Flex, useMantineTheme } from '@mantine/core'

import styles from './ui.module.css'

export const Home = () => {
	return (
		<Flex justify='center' align='center' h='100%' className={styles.root}>
			Home
		</Flex>
	)
}
