import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { LogOut, Settings } from 'lucide-react'

import { SidebarSearch } from '@features/search'
import { Avatar, Divider, Flex, Menu, Text, Title } from '@mantine/core'
import { $user, allUserExpired } from '@shared/auth'
import { path, routes } from '@shared/config'

import { $avatar } from './model'

import styles from './ui.module.css'

const pageInfo = {
	[path.HOME]: { title: 'Главная', subtitle: 'Контролируйте все свои проекты и задачи здесь' },
	[path.ACCOUNT]: { title: 'Настройки', subtitle: 'Настройте свой профиль и предпочтения' },
	[path.PROFILE]: { title: 'Профиль', subtitle: 'Просмотр и редактирование профиля' },
	[path.ANALYTICS]: { title: 'Аналитика', subtitle: '' }
}

export const Header = () => {
	const [avatar, name, onExit] = useUnit([$avatar, $user, allUserExpired])
	const pathname = window.location.pathname

	return (
		<Flex w='100%' h={80} px={20} py={10} mt={10} align='center' justify='space-between' className={styles.header}>
			<Flex direction='column'>
				<Title order={1} size={28}>
					{pageInfo?.[pathname]?.title}
				</Title>
				<Text>{pageInfo?.[pathname]?.subtitle}</Text>
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
							<Avatar size='46' src={avatar} radius='xl' variant='default' />
						</Link>
					</Menu.Target>
					<Menu.Dropdown>
						<Flex justify='center' align='center' pt={10} direction='column'>
							<Avatar size='46' src={avatar} radius='xl' variant='default' mb={10} />
							<Title order={3} size={14} fw={600} mb={10}>
								{name}
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
