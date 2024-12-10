import { Settings2 } from 'lucide-react'

import { ActionIcon, Box, Divider, Flex, Select, Title } from '@mantine/core'

export const AssignedTasks = () => (
	<Box p={20} style={{ borderRadius: '20px' }} w='100%' h='350px' bd='1px solid #D9D9D9' bg={'#fff'}>
		<Flex justify='space-between' h={36}>
			<Title order={2} size={20} fw={600}>
				Назначенные задачи
			</Title>
			<Flex gap={10}>
				<Select
					c='#f6f6f6'
					styles={{
						input: {
							background: '#f6f6f6'
						},
						dropdown: {
							background: '#f6f6f6'
						}
					}}
					data={['По дате возрастания', 'По дате убывания']}
					defaultValue='По дате возрастания'
					allowDeselect={false}
				/>
				<ActionIcon bg={'#f6f6f6'} h='100%' w='35px' variant='default' aria-label='Settings'>
					<Settings2 style={{ width: '70%', height: '70%' }} />
				</ActionIcon>
			</Flex>
		</Flex>
		<Divider my='sm' variant='dashed' />
	</Box>
)
