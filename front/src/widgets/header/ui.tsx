import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { LogOut, Settings, UserRoundPlus } from 'lucide-react'

import { Avatar, Divider, Flex, Menu, Skeleton, Text, Title } from '@mantine/core'

import { SidebarSearch } from '@features/search'
import { $username, allUserExpired } from '@shared/auth'
import { routes } from '@shared/config'
import { $avatar, getUserAvatarFx } from '@shared/store'

import { headerSchema } from './model'

import styles from './ui.module.css'

export const Header = () => {
	const [avatar, username, onExit, avatarLoading] = useUnit([$avatar, $username, allUserExpired, getUserAvatarFx.pending])
	const pathname = window.location.pathname

	return (
		<Flex
			align='center'
			className={styles.header}
			h={80}
			justify='space-between'
			mt={10}
			px={20}
			py={10}
			// pos='sticky'
			// bg={'#fff'}
			// style={{ zIndex: 100 }}
			// top={0}
			w='100%'
		>
			<Flex direction='column'>
				<Title size={28} order={1}>
					{headerSchema?.[pathname]?.title}
				</Title>
				<Text>{headerSchema?.[pathname]?.subtitle}</Text>
			</Flex>
			<Flex align='center' gap={20}>
				<SidebarSearch />
				<Divider my='xs' size='xs' orientation='vertical' />
				<UserRoundPlus />
				<Link className={styles.linkSetting} to={routes.private.account}>
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
					// offset={16}
				>
					<Menu.Target>
						<Link className={styles.link} to={routes.private.profile}>
							{!avatarLoading && <Avatar radius='xl' size='46' src={avatar} variant='default' />}
							{avatarLoading && <Skeleton height={46} radius='xl' width={46} />}
						</Link>
					</Menu.Target>
					<Menu.Dropdown>
						<Flex align='center' justify='center' pt={10} direction='column'>
							<Avatar mb={10} radius='xl' size='46' src={avatar} variant='default' />
							<Title fw={600} mb={10} size={14} order={3}>
								{username}
							</Title>
						</Flex>
						<Menu.Item component={Link} leftSection={<Settings />} to={routes.private.account}>
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
