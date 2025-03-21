// eslint-disable-next-line simple-import-sort/imports
import type { ReactNode } from 'react'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { Anchor, Avatar, Box, Button, Container, Divider, Flex, NavLink, Skeleton, Text } from '@mantine/core'
import { modals } from '@mantine/modals'

import { $username } from '@shared/auth'
import { routes } from '@shared/config'
import { $avatar, getUserAvatarFx } from '@shared/store'

export const AccountLayout = ({ children }: { children: ReactNode }) => {
	const [username, avatar, loading] = useUnit([$username, $avatar, getUserAvatarFx.$pending])

	const openDeleteModal = () =>
		modals.openConfirmModal({
			title: 'Удалить свой профиль',
			centered: true,
			children: (
				<Text size='sm'>
					Вы уверены, что хотите удалить свой профиль? Это действие удалит аккаунт без права на восстановление.
				</Text>
			),
			labels: { confirm: 'Удалить аккаунт', cancel: 'Отмена' },
			confirmProps: { color: 'red' },
			onConfirm: () => console.log('Confirmed')
		})

	return (
		<Container w={860}>
			<Flex align='center' justify='space-between' mb={20}>
				<Flex align='center' gap={20}>
					{!loading && <Avatar radius='xl' size={60} src={avatar} />}
					{loading && <Skeleton height={60} radius='xl' width={60} />}
					<Anchor c='pink' fz={16} component={Link} to={routes.private.profile}>
						{username}
					</Anchor>
				</Flex>
				<Button variant='light' component={Link} to={routes.private.profile}>
					Перейти в профиль
				</Button>
			</Flex>
			<Flex>
				<Flex miw='210' direction='column'>
					<NavLink
						active={routes.private.account.$isOpened.getState()}
						label='Общие'
						style={{ borderRadius: '10px 10px 0 0' }}
						component={Link}
						to={routes.private.account}
					/>
					<NavLink
						active={routes.private.account_personal.$isOpened.getState()}
						label='Персональные'
						component={Link}
						to={routes.private.account_personal}
					/>
					{/* <NavLink
						active={routes.private.customization.$isOpened.getState()}
						label='Кастомизация'
						component={Link}
						to={routes.private.customization}
					/> */}
					<NavLink
						active={routes.private.account_password.$isOpened.getState()}
						label='Пароль'
						style={{ borderRadius: '0 0 10px 10px' }}
						component={Link}
						to={routes.private.account_password}
					/>
					<Divider my='sm' variant='dashed' />
					<NavLink c='red' label='Удалить аккаунт' style={{ borderRadius: '10px' }} variant='subtle' onClick={openDeleteModal} />
				</Flex>
				<Box ml={20} w='100%'>
					{children}
				</Box>
			</Flex>
		</Container>
	)
}
