import { Box, Divider, Flex, Text, Title, useMantineTheme } from '@mantine/core'

import styles from './ui.module.css'

export const TotalStats = () => {
	const theme = useMantineTheme()

	return (
		<Box className={styles.root}>
			<Flex w='100%' p={20} align='center' h='100%'>
				<Flex w='20%' justify='space-between'>
					<Flex direction='column' align='start' h='100%' justify='center' gap={10}>
						<Title order={2} size={18} fw={600}>
							Всего проектов
						</Title>
						<Text size='30px'>10</Text>
					</Flex>
					<Divider orientation='vertical' variant='dashed' size={2} color={theme.colors.gray[3]} />
				</Flex>

				{/* <Flex direction='column' align='center'>
				<Title order={2} size={18} fw={600}>
					Всего проектов
				</Title>
				<Text>10</Text>
			</Flex>
			<Divider orientation='vertical' variant='dashed' />
			<Flex direction='column' align='center'>
				<Title order={2} size={18} fw={600}>
					Всего проектов
				</Title>
				<Text>10</Text>
			</Flex>
			<Divider orientation='vertical' variant='dashed' />
			<Flex direction='column' align='center'>
				<Title order={2} size={18} fw={600}>
					Всего проектов
				</Title>
				<Text>10</Text>
			</Flex>
			<Divider orientation='vertical' variant='dashed' />
			<Flex direction='column' align='center' justify='center'>
				<Title order={2} size={18} fw={600}>
					Всего проектов
				</Title>
				<Text>10</Text>
			</Flex> */}
			</Flex>
		</Box>
	)
}
