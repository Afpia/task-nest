import { useState } from 'react'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { Ellipsis, Plus, UserRoundPen, UserRoundX } from 'lucide-react'

import {
	ActionIcon,
	Avatar,
	Box,
	Card,
	Divider,
	Flex,
	Grid,
	Group,
	Image,
	Menu,
	ScrollArea,
	Select,
	Skeleton,
	Text,
	Title
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'

import people_not_found from '@app/assets/svg/people-not-found.svg'
import { ManageUserInWorkspaceModal } from '@entities/manage-user-in-workspace-modal'
import { role, routes, ThemeColors } from '@shared/config'
import { isDarkMode, SrcImage } from '@shared/helpers'
import { $workspaceRole, getWorkspaceRoleFx, kickedUserFromWorkspace } from '@shared/store'

import { $usersWorkspace, changedOrder, getUsersWorkspaceFx } from '../model'

const role_naming = {
	owner: 'Владелец',
	admin: 'Админ',
	executor: 'Исполнитель',
	project_manager: 'Проектный менеджер'
}

export const People = () => {
	const { isDark } = isDarkMode()
	const [users, usersLoading, myRole, roleLoading, kickUserFromWorkspace, changeOrder] = useUnit([
		$usersWorkspace,
		getUsersWorkspaceFx.$pending,
		$workspaceRole,
		getWorkspaceRoleFx.$pending,
		kickedUserFromWorkspace,
		changedOrder
	])
	const [modalProps, setModalProps] = useState<{
		roleUser: 'admin' | 'executor' | 'owner' | 'project_manager'
		userId: number
	}>(
		{} as {
			roleUser: 'admin' | 'executor' | 'owner' | 'project_manager'
			userId: number
		}
	)
	const [opened, { open, close }] = useDisclosure(false)

	const openKickModal = (id: number) =>
		modals.openConfirmModal({
			title: 'Выгнать пользователя',
			centered: true,
			children: <Text size='sm'>Вы уверены, что хотите выгнать пользователя?</Text>,
			labels: { confirm: 'Выгнать пользователя', cancel: 'Отмена' },
			confirmProps: { color: 'red' },
			onConfirm: () => kickUserFromWorkspace({ user_id: id })
		})

	const openManageModal = (id: number, roleUser: 'admin' | 'executor' | 'owner' | 'project_manager') => {
		setModalProps({ roleUser, userId: id })
		open()
	}

	return (
		<Box
			bd={`1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}`}
			bg={isDark ? ThemeColors.dark : ThemeColors.light}
			h='300px'
			mih='100%'
			p={20}
			style={{ borderRadius: '20px' }}
			w='50%'
		>
			<Flex justify='space-between'>
				{usersLoading && <Skeleton h={36} w={100} />}
				{!usersLoading && (
					<Title fw={600} size={20} order={2}>
						{/* eslint-disable-next-line style/jsx-one-expression-per-line */}
						Люди ({users.length})
					</Title>
				)}
				<Flex gap={10}>
					<Select
						defaultValue='asc'
						data={[
							{ value: 'asc', label: 'По должности возрастания' },
							{ value: 'desc', label: 'По должности убывания' }
						]}
						allowDeselect={false}
						onChange={(value) => changeOrder(value as 'asc' | 'desc')}
					/>
					{/* {(myRole.role === role.OWNER || myRole.role === role.ADMIN) && ( */}
					<Link to={routes.private.search}>
						<ActionIcon aria-label='Plus' h='100%' variant='filled' w='35px'>
							<Plus style={{ width: '70%', height: '70%' }} />
						</ActionIcon>
					</Link>
					{/* )} */}
				</Flex>
			</Flex>
			<Divider my='sm' variant='dashed' />
			{(usersLoading || roleLoading) && <Skeleton h={195} />}
			{!usersLoading && !roleLoading && users.length === 0 && (
				<Flex align='center' justify='center'>
					<Image h={195} src={people_not_found} w={210} />
				</Flex>
			)}
			{!usersLoading && !roleLoading && users.length >= 1 && (
				<ScrollArea h='200px' scrollbars='y'>
					<Grid h='100%' styles={{ inner: { maxWidth: '100%', margin: '0 auto' } }}>
						{users.map((item) => (
							<Grid.Col key={item.id} p={5} span={4}>
								<Card radius='lg' shadow='sm' withBorder>
									<Card.Section py='xs' inheritPadding withBorder>
										<Group justify='space-between'>
											<Text fw={500} maw={110} truncate='end'>
												{role_naming[item.pivot.role]}
											</Text>
											{(myRole.role === role.OWNER || myRole.role === role.ADMIN) && item.pivot.role !== role.OWNER && (
												<Menu position='bottom-end' shadow='sm' withinPortal>
													<Menu.Target>
														<ActionIcon variant='subtle' color='gray'>
															<Ellipsis size={16} />
														</ActionIcon>
													</Menu.Target>

													<Menu.Dropdown>
														<Menu.Item
															leftSection={<UserRoundPen size={14} />}
															onClick={() => openManageModal(item.id, item.pivot.role)}
														>
															Изменить роль
														</Menu.Item>
														<Menu.Item color='red' leftSection={<UserRoundX size={14} />} onClick={() => openKickModal(item.id)}>
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

											<Text>{item.name}</Text>
										</Flex>
									</Card.Section>
								</Card>
							</Grid.Col>
						))}
					</Grid>
				</ScrollArea>
			)}
			<ManageUserInWorkspaceModal
				userId={modalProps?.userId}
				close={close}
				opened={opened}
				roleUser={modalProps?.roleUser as 'admin' | 'executor' | 'project_manager'}
			/>
		</Box>
	)
}
