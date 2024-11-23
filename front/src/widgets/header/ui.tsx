import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { Settings } from 'lucide-react'

import { SidebarSearch } from '@features/search'
import { Avatar, Divider, Flex, Text, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { path, routes } from '@shared/config'

import { $avatar } from './model'

import styles from './ui.module.css'

const pageInfo = {
	[path.HOME]: { title: 'Главная', subtitle: 'Контролируйте все свои проекты и задачи здесь' },
	[path.SETTINGS]: { title: 'Настройки', subtitle: 'Настройте свой профиль и предпочтения' },
	[path.PROFILE]: { title: 'Профиль', subtitle: 'Просмотр и редактирование профиля' },
	[path.ANALYTICS]: { title: 'Аналитика', subtitle: '' }
}

export const Header = () => {
	const [avatar] = useUnit([$avatar])
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
				<Link to={routes.private.settings} className={styles.linkSetting}>
					<Settings />
				</Link>
				<Divider size='xs' my='xs' orientation='vertical' />
				<Link to={routes.private.profile} className={styles.link}>
					<Avatar size='46' src={avatar} radius='xl' variant='default' />
				</Link>
			</Flex>
		</Flex>
	)
}
