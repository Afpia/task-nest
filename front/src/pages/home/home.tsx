import { Flex, Title, useMantineTheme } from '@mantine/core'

export const Home = () => {
	const theme = useMantineTheme()

	return (
		<Flex justify='center' align='center' h='100%' bg={theme.colors.gray[3]}>
			<Title order={1}>Выберите задачу</Title>
		</Flex>
	)
}
