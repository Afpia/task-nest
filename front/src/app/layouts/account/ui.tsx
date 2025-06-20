import type { ReactNode } from 'react'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { Anchor, Avatar, Box, Button, Container, Divider, Flex, NavLink, Skeleton, Text } from '@mantine/core'
import { modals } from '@mantine/modals'

import { routes } from '@shared/config'
import { SrcImage } from '@shared/helpers'
import { $user, getUserFx } from '@shared/store'
import { deletedUser } from '@shared/store/user/delete'

export const AccountLayout = ({ children }: { children: ReactNode }) => {
	const [user, loading, deleteUser] = useUnit([$user, getUserFx.$pending, deletedUser])

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
			onConfirm: () => deleteUser(user.email)
		})

	return (
		<Container w={860}>
			{loading && <Skeleton height={60} mb={20} radius='xl' />}
			{!loading && (
				<Flex align='center' justify='space-between' mb={20}>
					<Flex align='center' gap={20}>
						<Avatar radius='xl' size={60} src={SrcImage(user.avatar_url)} />
						<Anchor
							c='pink'
							fz={16}
							params={{ userLogin: user?.login ?? '' }}
							component={Link}
							to={routes.private.profile as unknown as string}
						>
							{user.name}
						</Anchor>
					</Flex>
					<Button
						params={{ userLogin: user?.login ?? '' }}
						variant='light'
						component={Link}
						to={routes.private.profile as unknown as string}
					>
						Перейти в профиль
					</Button>
				</Flex>
			)}
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
