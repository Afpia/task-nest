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

import people_not_found from '@app/assets/svg/people-not-found.svg'
import { role, routes, ThemeColors } from '@shared/config'
import { isDarkMode, SrcImage } from '@shared/helpers'
import { $user, $workspaceRole, getWorkspaceRoleFx, kickedUserFromWorkspace } from '@shared/store'

import { $usersWorkspace, getUsersWorkspaceFx } from '../model'

const role_naming = {
	owner: 'Владелец',
	admin: 'Админ',
	executor: 'Исполнитель',
	project_manager: 'Проектный менеджер'
}

export const People = () => {
	const { isDark } = isDarkMode()
	const [users, user, usersLoading, myRole, roleLoading, kickUserFromWorkspace] = useUnit([
		$usersWorkspace,
		$user,
		getUsersWorkspaceFx.$pending,
		$workspaceRole,
		getWorkspaceRoleFx.$pending,
		kickedUserFromWorkspace
	])

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
						Люди ({(users.length ?? 1) - 1})
					</Title>
				)}
				<Flex gap={10}>
					<Select
						data={['По должности возрастания', 'По должности убывания']}
						defaultValue='По должности убывания'
						allowDeselect={false}
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
			{!usersLoading && !roleLoading && users.length === 1 && (
				<Flex align='center' justify='center'>
					<Image h={195} src={people_not_found} w={210} />
				</Flex>
			)}
			{!usersLoading && !roleLoading && users.length >= 2 && (
				<ScrollArea h='200px' scrollbars='y'>
					<Grid h='100%' styles={{ inner: { maxWidth: '100%', margin: '0 auto' } }}>
						{users
							.filter((item) => item.id !== user.id)
							.map((item) => (
								<Grid.Col key={item.id} p={5} span={4}>
									<Card radius='lg' shadow='sm' withBorder>
										<Card.Section py='xs' inheritPadding withBorder>
											<Group justify='space-between'>
												<Text fw={500} maw={110} truncate='end'>
													{role_naming[item.pivot.role]}
												</Text>
												{(myRole.role === role.OWNER || myRole.role === role.ADMIN) && (
													<Menu position='bottom-end' shadow='sm' withinPortal>
														<Menu.Target>
															<ActionIcon variant='subtle' color='gray'>
																<Ellipsis size={16} />
															</ActionIcon>
														</Menu.Target>

														<Menu.Dropdown>
															<Menu.Item leftSection={<UserRoundPen size={14} />}>Изменить роль</Menu.Item>
															<Menu.Item
																color='red'
																leftSection={<UserRoundX size={14} />}
																onClick={() => kickUserFromWorkspace({ user_id: item.id })}
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
												<Avatar mb={5} radius='100%' size='85' src={SrcImage(item.avatar_url)} variant='default' />

												<Text>{item.name}</Text>
											</Flex>
										</Card.Section>
									</Card>
								</Grid.Col>
							))}
					</Grid>
				</ScrollArea>
			)}
		</Box>
	)
}
