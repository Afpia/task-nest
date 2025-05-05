import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { LogOut, Settings, UserRoundPlus } from 'lucide-react'

import { Avatar, Divider, Flex, Menu, Skeleton, Text, Title } from '@mantine/core'

import { SidebarSearch } from '@features/search'
import { $username, allUserExpired } from '@shared/auth'
import { router, routes } from '@shared/config'
import { SrcImage } from '@shared/helpers'
import { $user, getUserFx } from '@shared/store'

import { resolveHeader } from './model'

export const Header = () => {
	const [user, username, onExit, userLoading] = useUnit([$user, $username, allUserExpired, getUserFx.$pending])
	const [currentPath] = useUnit([router.$path])
	const [{ userLogin }] = useUnit([routes.private.profile.$params])

	const { title, subtitle } = resolveHeader(currentPath, userLogin, user)

	return (
		<Flex align='center' h={80} justify='space-between' mt={10} px={20} py={10} w='100%'>
			<Flex direction='column'>
				<Title size={28} order={1}>
					{title}
				</Title>
				<Text>{subtitle}</Text>
			</Flex>
			<Flex align='center' gap={20}>
				<SidebarSearch />
				<Divider my='xs' size='xs' orientation='vertical' />
				<Link style={{ color: 'inherit', height: '24px' }} to={routes.private.search}>
					<UserRoundPlus />
				</Link>
				<Link style={{ color: 'inherit', height: '24px' }} to={routes.private.account}>
					<Settings />
				</Link>
				<Divider my='xs' size='xs' orientation='vertical' />
				<Menu
					trigger='hover'
					width={200}
					closeDelay={400}
					openDelay={100}
					position='bottom-end'
					transitionProps={{ transition: 'pop', duration: 200 }}
				>
					<Menu.Target>
						<Flex>
							{!userLoading && (
								<Link params={{ userLogin: user.login }} to={routes.private.profile}>
									<Avatar radius='xl' size='46' src={SrcImage(user.avatar_url)} variant='default' />
								</Link>
							)}
							{userLoading && <Skeleton height={46} radius='xl' width={46} />}
						</Flex>
					</Menu.Target>
					<Menu.Dropdown>
						<Flex align='center' justify='center' pt={10} direction='column'>
							<Avatar mb={10} radius='xl' size='46' src={SrcImage(user.avatar_url)} variant='default' />
							<Title fw={600} mb={10} size={14} order={3}>
								{username}
							</Title>
						</Flex>
						<Menu.Item component={Link} leftSection={<Settings />} to={routes.private.account}>
							Настройки
						</Menu.Item>
						<Divider my={4} variant='dashed' />
						<Menu.Item c='red' variant='outline' leftSection={<LogOut />} onClick={onExit}>
							Выйти
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Flex>
		</Flex>
	)
}
