import { Settings2 } from 'lucide-react'

import { ActionIcon, Box, Divider, Flex, Select, Title } from '@mantine/core'

export const AssignedTasks = () => (
	<Box bd='1px solid #D9D9D9' h='350px' p={20} style={{ borderRadius: '20px' }} w='50%'>
		<Flex h={36} justify='space-between'>
			<Title fw={600} size={20} order={2}>
				Назначенные задачи
			</Title>
			<Flex gap={10}>
				<Select data={['По дате возрастания', 'По дате убывания']} defaultValue='По дате возрастания' allowDeselect={false} />
				<ActionIcon aria-label='Settings' h='100%' variant='default' w='35px'>
					<Settings2 style={{ width: '70%', height: '70%' }} />
				</ActionIcon>
			</Flex>
		</Flex>
		<Divider my='sm' variant='dashed' />
	</Box>
)
