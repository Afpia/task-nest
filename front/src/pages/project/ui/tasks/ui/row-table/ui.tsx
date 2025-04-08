import { useUnit } from 'effector-react'
import { Trash } from 'lucide-react'

import { ActionIcon, Badge, Checkbox, Flex, Progress, Table, Text } from '@mantine/core'

import { deletedTaskProject } from '@shared/store/tasks/delete'
import type { TaskResponse } from '@shared/types'

export const Row = ({ tasks }: { tasks: TaskResponse[] }) => {
	const [deleteTask] = useUnit([deletedTaskProject])

	return tasks.map((element) => (
		<Table.Tr h={50} key={element.id}>
			<Table.Td>
				<Checkbox aria-label='Select row' />
			</Table.Td>
			<Table.Td>
				<Text>{element.title}</Text>
			</Table.Td>
			<Table.Td width={200}>
				<Flex align='center' gap={8}>
					{/* <Avatar size={30} src={element.assignee[0].avatar_url} /> */}
					<Text fw='bold' fz={14}>
						{/* {element.users.map((username) => username.name).join(', ')} */}
Я
					</Text>
				</Flex>
			</Table.Td>
			<Table.Td>{element.end_date}</Table.Td>
			<Table.Td>
				<Badge color={element.status === 'Завершена' ? 'lime' : 'blue'}>{element.status}</Badge>
			</Table.Td>
			<Table.Td>
				<Flex gap={20} justify='space-between'>
					<Flex align='center' gap={60}>
						<Text fw='bold'>0%</Text>
						<Progress value={0} w={100} />
					</Flex>
					<ActionIcon aria-label='Settings' h='100%' variant='default' w='30px' onClick={() => deleteTask(element.id)}>
						{/* <ChevronDown style={{ width: '70%', height: '70%' }} /> */}
						<Trash style={{ width: '70%', height: '70%' }} />
					</ActionIcon>
				</Flex>
			</Table.Td>
		</Table.Tr>
	))
}
