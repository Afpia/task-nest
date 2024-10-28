import { Box, Divider, Flex, Grid, Text, Title } from '@mantine/core'

import styles from './ui.module.css'

export const TotalStats = () => {
	return (
		<Box className={styles.root}>
			<Flex w='100%' justify='space-between' px={20} align='center' h='100%'>
				<Flex direction={'column'} align='center' h='100%' justify='center'>
					<Title order={2} size={18} fw={600}>
						Всего проектов
					</Title>
					<Text>10</Text>
				</Flex>
				<Divider orientation='vertical' variant='dashed' />
				<Flex direction={'column'} align='center'>
					<Title order={2} size={18} fw={600}>
						Всего проектов
					</Title>
					<Text>10</Text>
				</Flex>
				<Divider orientation='vertical' variant='dashed' />
				<Flex direction={'column'} align='center'>
					<Title order={2} size={18} fw={600}>
						Всего проектов
					</Title>
					<Text>10</Text>
				</Flex>
				<Divider orientation='vertical' variant='dashed' />
				<Flex direction={'column'} align='center'>
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
				</Flex>
			</Flex>
		</Box>
	)
}
