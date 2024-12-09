import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { LogOut, Settings } from 'lucide-react'

import { Avatar, Divider, Flex, Menu, Skeleton, Text, Title } from '@mantine/core'

import { SidebarSearch } from '@features/search'
import { $username, allUserExpired } from '@shared/auth'
import { path, routes } from '@shared/config'
import { $avatar, getUserAvatarFx } from '@shared/store'

import { headerSchema } from './model'

import styles from './ui.module.css'

export const Header = () => {
	const [avatar, username, onExit, avatarLoading] = useUnit([$avatar, $username, allUserExpired, getUserAvatarFx.pending])
	const pathname = window.location.pathname

	return (
		<Flex w='100%' h={80} px={20} py={10} mt={10} align='center' justify='space-between' className={styles.header}>
			<Flex direction='column'>
				<Title order={1} size={28}>
					{headerSchema?.[pathname]?.title}
				</Title>
				<Text>{headerSchema?.[pathname]?.subtitle}</Text>
			</Flex>
			<Flex align='center' gap={20}>
				<SidebarSearch />
				<Divider size='xs' my='xs' orientation='vertical' />
				<Link to={routes.private.account} className={styles.linkSetting}>
					<Settings />
				</Link>
				<Divider size='xs' my='xs' orientation='vertical' />
				<Menu
					transitionProps={{ transition: 'pop', duration: 200 }}
					trigger='hover'
					openDelay={100}
					closeDelay={400}
					position='bottom-end'
					width={200}
					// offset={16}
				>
					<Menu.Target>
						<Link to={routes.private.profile} className={styles.link}>
							{!avatarLoading && <Avatar size='46' src={avatar} radius='xl' variant='default' />}
							{avatarLoading && <Skeleton width={46} height={46} radius='xl' />}
						</Link>
					</Menu.Target>
					<Menu.Dropdown>
						<Flex justify='center' align='center' pt={10} direction='column'>
							<Avatar size='46' src={avatar} radius='xl' variant='default' mb={10} />
							<Title order={3} size={14} fw={600} mb={10}>
								{username}
							</Title>
						</Flex>
						<Menu.Item component={Link} to={routes.private.account} leftSection={<Settings />}>
							Настройки
						</Menu.Item>
						<Menu.Divider />
						<Menu.Item variant='outline' leftSection={<LogOut />} onClick={onExit}>
							Выйти
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Flex>
		</Flex>
	)
}
