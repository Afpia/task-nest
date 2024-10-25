import { Flex, useMantineTheme } from '@mantine/core'

import styles from './ui.module.css'

export const Home = () => {
	const theme = useMantineTheme()

	return <Flex justify='center' align='center' h='100%' bg={theme.colors.gray[3]} className={styles.root}></Flex>
}
