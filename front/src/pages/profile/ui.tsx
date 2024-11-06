import { Avatar, Box, Button, Flex, Text, Title } from '@mantine/core'

import styles from './ui.module.css'

export const Profile = () => {
	// const
	return (
		<Flex direction='column' gap='20'>
			<Box className={styles.root}>
				<Flex w='100%' h='100%' align='center' justify='space-between' p={20}>
					<Flex align='start' justify='start' gap={20}>
						<Avatar size='85' src={''} radius='100%' variant='gradient' />
						<Flex direction='column' align='start' h='100%' justify='center' gap={10}>
							<Text>Hello</Text>
							<Text>Hello</Text>
						</Flex>
					</Flex>
					<Button variant='outline' radius='lg'>
						Редактировать
					</Button>
				</Flex>
			</Box>
			<Box className={styles.root}>
				<Flex w='100%' h='100%' align='center' justify='space-between' p={20}>
					<Flex align='start' h='100%' justify='start' gap={20}>
						<Title order={3} size={18} fw={600}>
							Персональные данные
						</Title>
					</Flex>
					<Button variant='outline' radius='lg'>
						Редактировать
					</Button>
				</Flex>
			</Box>
		</Flex>
	)
}
