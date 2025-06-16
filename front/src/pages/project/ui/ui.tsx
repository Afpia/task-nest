import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { Ellipsis, UserRoundPlus, UserRoundX } from 'lucide-react'

import {
	ActionIcon,
	Avatar,
	Button,
	Card,
	Flex,
	Grid,
	Group,
	Image,
	Menu,
	ScrollArea,
	Skeleton,
	Tabs,
	Text,
	Title
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'

import people_not_found from '@app/assets/svg/people-project-not-found.svg'
import { ModalAddUserToProject } from '@entities/add-user-to-project-modal'
import { ROLE, ROLE_NAMING, routes } from '@shared/config'
import { SrcImage } from '@shared/helpers'
import {
	$currentProject,
	$usersProject,
	$workspaceRole,
	getCurrentProjectFx,
	getUsersProjectFx,
	getWorkspaceRoleFx,
	kickedUserFromProject
} from '@shared/store'
import { StatsProject } from '@widgets/stats-project'
import { Tasks } from '@widgets/task-table'

export const Project = () => {
	const [{ project }, currentProjectLoading, users, loadingUsers, kickUserFromProject, { role }, myRoleLoading] = useUnit([
		$currentProject,
		getCurrentProjectFx.$pending,
		$usersProject,
		getUsersProjectFx.$pending,
		kickedUserFromProject,
		$workspaceRole,
		getWorkspaceRoleFx.$pending
	])
	const [opened, { open, close }] = useDisclosure(false)

	const openKickModal = (id: number) =>
		modals.openConfirmModal({
			title: 'Выгнать пользователя',
			centered: true,
			children: <Text size='sm'>Вы уверены, что хотите выгнать пользователя?</Text>,
			labels: { confirm: 'Выгнать пользователя', cancel: 'Отмена' },
			confirmProps: { color: 'red' },
			onConfirm: () => kickUserFromProject(id)
		})

	return (
		<>
			<Flex align='center' justify='space-between' mb={20} w='100%'>
				<Flex align='center' gap={16}>
					{!currentProjectLoading && (
						<>
							<Avatar radius='md' src={project.image_url} />
							<Flex direction='column'>
								<Title order={3}>{project.title}</Title>
								<Text>{project.status}</Text>
							</Flex>
						</>
					)}
					{currentProjectLoading && <Skeleton height={38} width={250} />}
				</Flex>
				{(role === ROLE.ADMIN || role === ROLE.OWNER) && (
					<Button variant='light' leftSection={<UserRoundPlus />} onClick={open}>
						Пригласить на проект
					</Button>
				)}
			</Flex>

			<StatsProject />

			<Tabs defaultValue='tasks' mt={30}>
				<Tabs.List mb={20}>
					<Tabs.Tab value='tasks'>Задачи</Tabs.Tab>
					<Tabs.Tab value='members'>Участники</Tabs.Tab>
					{/* <Tabs.Tab value='discussions'>Обсуждения</Tabs.Tab> */}
				</Tabs.List>

				<Tabs.Panel value='tasks'>
					<Tasks />
				</Tabs.Panel>

				<Tabs.Panel value='members'>
					{(loadingUsers || myRoleLoading) && <Skeleton height={250} style={{ borderRadius: '10px' }} width='100%' />}
					{users.length === 0 && !loadingUsers && !myRoleLoading && (
						<Flex align='center' justify='center'>
							<Image h={250} src={people_not_found} w={400} />
						</Flex>
					)}
					{users.length > 0 && !loadingUsers && !myRoleLoading && (
						<ScrollArea h='350px' scrollbars='y'>
							<Grid h='100%' styles={{ inner: { maxWidth: '100%', margin: '0 auto' } }}>
								{users.map((item) => (
									<Grid.Col key={item.id} p={5} span={2}>
										<Card radius='lg' shadow='sm' withBorder>
											<Card.Section py='xs' inheritPadding withBorder>
												<Group justify='space-between'>
													<Text fw={500} maw={110} truncate='end'>
														{ROLE_NAMING[item.pivot.role]}
													</Text>
													{(role === ROLE.OWNER || role === ROLE.ADMIN) && (
														<Menu position='bottom-end' shadow='sm' withinPortal>
															<Menu.Target>
																<ActionIcon variant='subtle' color='gray'>
																	<Ellipsis size={16} />
																</ActionIcon>
															</Menu.Target>

															<Menu.Dropdown>
																<Menu.Item
																	color='red'
																	leftSection={<UserRoundX size={14} />}
																	onClick={() => openKickModal(item.id)}
																>
																	Выгнать из проекта
																</Menu.Item>
															</Menu.Dropdown>
														</Menu>
													)}
												</Group>
											</Card.Section>
											<Card.Section mt='sm' pb='sm' inheritPadding>
												<Flex align='center' justify='center' direction='column'>
													<Link params={{ userLogin: item.login }} to={routes.private.profile}>
														<Avatar mb={5} radius='100%' size='82' src={SrcImage(item.avatar_url)} variant='default' />
													</Link>
													<Text mb={15}>{item.name}</Text>
												</Flex>
											</Card.Section>
										</Card>
									</Grid.Col>
								))}
							</Grid>
						</ScrollArea>
					)}
				</Tabs.Panel>
			</Tabs>
			<ModalAddUserToProject close={close} opened={opened} />
		</>
	)
}
