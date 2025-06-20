import { useState } from 'react'
import { useUnit } from 'effector-react'

import { Accordion, Avatar, Badge, Button, Container, Flex, Group, Skeleton, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ModalUpdateWorkspace } from '@entities/update-workspace-modal'
import { BADGE_COLOR_ROLE, ROLE, ROLE_NAMING, ThemeColors } from '@shared/config'
import { isDarkMode, SrcImage } from '@shared/helpers'
import { $workspaces, changedWorkspace, getUserWorkspacesFx } from '@shared/store'

export const Workspaces = () => {
	const [workspaces, loadingWorkspace, change] = useUnit([$workspaces, getUserWorkspacesFx.$pending, changedWorkspace])
	const { isDark } = isDarkMode()
	const [currentWorkspace, setCurrentWorkspace] = useState({ title: '', description: '', workspaceId: '' })
	const [opened, { open, close }] = useDisclosure(false)

	const color = isDark ? ThemeColors.secondDark : ThemeColors.secondLight

	return (
		<Container bg={color} p={20} size='sm' style={{ borderRadius: 20 }}>
			<Flex justify='center'>
				<Title mb={30} mt={10}>
					Управляйте своими областями
				</Title>
			</Flex>
			{loadingWorkspace && <Skeleton height={300} radius={10} />}
			{!loadingWorkspace && (
				<Accordion radius={10} variant='contained'>
					{workspaces.map((item) => (
						<Accordion.Item key={item.id} py={10} value={item.id.toString()}>
							<Accordion.Control>
								<Group wrap='nowrap'>
									<Avatar radius='lg' size='lg' src={SrcImage(item.image_url)} />
									<div>
										<Text>{item.title}</Text>
										<Badge color={BADGE_COLOR_ROLE[item.pivot.role]}>{ROLE_NAMING[item.pivot.role]}</Badge>
									</div>
								</Group>
							</Accordion.Control>
							<Accordion.Panel>
								<Flex gap={10} direction='column'>
									<Text c='dimmed' fw={400} size='sm'>
										{item.description ?? 'Описание отсутствует'}
									</Text>
									<Flex gap={10} justify='right'>
										<Button onClick={() => change(item.id.toString())}>Перейти</Button>
										<Button
											disabled={item.pivot.role !== ROLE.OWNER}
											variant='gradient'
											onClick={() => {
												setCurrentWorkspace({ title: item.title, description: item.description, workspaceId: item.id.toString() })
												open()
											}}
										>
											Изменить
										</Button>
										{/* <Button disabled={item.pivot.role !== ROLE.OWNER} variant='light'>
											Удалить
										</Button> */}
									</Flex>
								</Flex>
							</Accordion.Panel>
						</Accordion.Item>
					))}
				</Accordion>
			)}
			<ModalUpdateWorkspace
				id={currentWorkspace.workspaceId}
				title={currentWorkspace.title}
				close={close}
				description={currentWorkspace.description}
				opened={opened}
			/>
		</Container>
	)
}
