import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { ChevronDown, Trash } from 'lucide-react'

import { ActionIcon, Anchor, Avatar, Badge, Checkbox, Flex, Menu, Table, Text, Tooltip } from '@mantine/core'

import { routes } from '@shared/config'
import { ICON_MAP, SrcImage } from '@shared/helpers'
import { $workspaceRole, deletedTaskProject } from '@shared/store'
import type { TaskResponse } from '@shared/types'

const BADGE_COLOR = {
	Назначена: 'blue',
	Завершена: 'lime',
	Выполняется: 'violet',
	Приостановлена: 'gray',
	Просрочена: 'red'
}

export const Row = ({ tasks }: { tasks: TaskResponse[] }) => {
	const [deleteTask, { role }] = useUnit([deletedTaskProject, $workspaceRole])

	return tasks.map((element) => (
		<Table.Tr h={50} key={element.id}>
			<Table.Td>
				<Checkbox aria-label='Select row' />
			</Table.Td>
			<Table.Td>
				<Text>{element.title}</Text>
			</Table.Td>
			<Table.Td width={200}>
				<Flex align='center' gap={8} justify='left'>
					<Tooltip.Group closeDelay={100} openDelay={300}>
						<Avatar.Group spacing='sm'>
							{element.users.slice(0, 3).map((item) => (
								<Tooltip key={item.id} label={item.name} withArrow>
									<Avatar
										params={{ userLogin: item?.login ?? '' }}
										radius='xl'
										size={40}
										src={SrcImage(item.avatar_url)}
										component={Link}
										to={routes.private.profile as unknown as string}
									/>
								</Tooltip>
							))}
							{element.users.length > 3 && (
								<Tooltip
									label={element.users.slice(3).map((item) => (
										<div key={item.id}>{item.name}</div>
									))}
									withArrow
								>
									<Avatar radius='xl'>+{element.users.slice(3).length}</Avatar>
								</Tooltip>
							)}
						</Avatar.Group>
					</Tooltip.Group>
					{element.users.length === 1 && (
						<Text
							params={{ userLogin: element.users?.[0].login ?? '' }}
							size='sm'
							component={Link}
							to={routes.private.profile as unknown as string}
						>
							{element.users[0].name}
						</Text>
					)}
				</Flex>
			</Table.Td>
			<Table.Td>
				{!element.end_date && <Text size='sm'>Нет срока</Text>}
				{element.end_date}
			</Table.Td>
			<Table.Td>
				<Badge color={BADGE_COLOR[element.status as keyof typeof BADGE_COLOR]}>{element.status}</Badge>
			</Table.Td>
			<Table.Td>
				<Flex gap={20} justify='space-between'>
					<Flex align='center' gap={10} w={100}>
						{element.files.length === 0 && <Text size='sm'>Нет вложений</Text>}
						{element.files.map((file) => (
							<Tooltip key={file.id} label={file.original_name} withArrow>
								<Anchor href={SrcImage(file.path)} size='xs' download={file.original_name}>
									{ICON_MAP[file.mime_type as keyof typeof ICON_MAP]}
								</Anchor>
							</Tooltip>
						))}
					</Flex>
					{!(role === 'executor') && (
						<Menu position='bottom-end' shadow='sm' withinPortal>
							<Menu.Target>
								<ActionIcon variant='default' color='gray'>
									<ChevronDown style={{ width: '70%', height: '70%' }} />
								</ActionIcon>
							</Menu.Target>

							<Menu.Dropdown>
								<Menu.Item color='red' leftSection={<Trash size={14} />} onClick={() => deleteTask(element.id)}>
									Удалить задачу
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					)}
				</Flex>
			</Table.Td>
		</Table.Tr>
	))
}
