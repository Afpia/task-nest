import { Flex, Title, useMantineTheme } from '@mantine/core'

import styles from './header.module.css'

export const Header = () => {
	const theme = useMantineTheme()

	return (
		<Flex w='100%' h={70} p={10} style={{ borderBottom: `1px solid ${theme.colors.pink[4]}` }} align='center'>
			<Title pl={10} order={1} c={theme.colors.pink[4]}>
				{/* TaskNest */}
			</Title>
		</Flex>
	)
}
