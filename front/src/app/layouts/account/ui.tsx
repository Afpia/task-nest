import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { Anchor, Avatar, Box, Button, Container, Divider, Flex, NavLink, Text, Title } from '@mantine/core'
import { modals } from '@mantine/modals'
import { $user } from '@shared/auth'
import { routes } from '@shared/config'
import type { Children } from '@shared/types'
import { $avatar } from '@widgets/header/model'

export const AccountLayout = ({ children }: Children) => {
	const [user, avatar] = useUnit([$user, $avatar])
	// TODO: avatar с widjet

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
			<Flex justify='space-between' align='center' mb={20}>
				<Flex align='center' gap={20}>
					<Avatar src={avatar} size={60} />
					<Anchor component={Link} to={routes.private.profile} fz={16} variant='gradient'>
						{user}
					</Anchor>
				</Flex>
				<Button component={Link} variant='light' to={routes.private.profile}>
					Перейти в профиль
				</Button>
			</Flex>
			<Flex>
				<Flex direction='column' miw='210'>
					<NavLink
						component={Link}
						to={routes.private.account}
						label='Общие'
						active={routes.private.account.$isOpened.getState()}
					/>
					<NavLink
						component={Link}
						label='Персональные'
						active={routes.private.account_personal.$isOpened.getState()}
						to={routes.private.account_personal}
					/>
					<NavLink
						component={Link}
						label='Пароль'
						active={routes.private.account_password.$isOpened.getState()}
						to={routes.private.account_password}
					/>
					<Divider my='sm' variant='dashed' />
					<NavLink onClick={openDeleteModal} variant='subtle' c='red' label='Удалить аккаунт' />
				</Flex>
				<Box w='100%' ml={20}>
					{children}
				</Box>
			</Flex>
		</Container>
	)
}
