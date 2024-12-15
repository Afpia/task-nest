import { Plus, Settings2 } from 'lucide-react'

import { ActionIcon, Box, Divider, Flex, Select, Title } from '@mantine/core'

export const People = () => (
	<Box p={20} style={{ borderRadius: '20px' }} w='50%' h='300px' mih='100%' bd='1px solid #D9D9D9'>
		<Flex justify='space-between'>
			<Title order={2} size={20} fw={600}>
				Люди (0)
			</Title>
			<Flex gap={10}>
				<Select
					data={['По должности', 'По дате убывания', 'По дате возрастания']}
					defaultValue='По должности'
					allowDeselect={false}
				/>
				<ActionIcon h='100%' w='35px' variant='default' aria-label='Settings'>
					<Settings2 style={{ width: '70%', height: '70%' }} />
				</ActionIcon>
				<ActionIcon h='100%' w='35px' variant='filled' aria-label='Plus'>
					<Plus style={{ width: '70%', height: '70%' }} />
				</ActionIcon>
			</Flex>
		</Flex>
		<Divider my='sm' variant='dashed' />
	</Box>
)
