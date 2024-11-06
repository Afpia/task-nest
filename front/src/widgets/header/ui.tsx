import { Settings } from 'lucide-react'

import { SidebarSearch } from '@features/search'
import { Avatar, Divider, Flex, Text, Title, useMantineTheme } from '@mantine/core'
import { mappedRoutes, routes } from '@shared/config'

import styles from './ui.module.css'
import { useLocation } from 'react-router-dom'
import { Link } from 'atomic-router-react'

const pageInfo = {
	[mappedRoutes[7].path]: { title: 'Главная', subtitle: 'Контролируйте все свои проекты и задачи здесь' }
	// [routes.private.settings]: { title: 'Настройки', subtitle: 'Настройте свой профиль и предпочтения' },
	// [routes.private.profile]: { title: 'Профиль', subtitle: 'Просмотр и редактирование профиля' },
	// [routes.private.analytics]: { title: 'Аналитика', subtitle: '' }
}

export const Header = () => {
	const theme = useMantineTheme()
	const pathname = window.location.pathname

	return (
		<Flex
			w='100%'
			h={80}
			px={20}
			py={10}
			mt={10}
			align='center'
			justify='space-between'
			bg={theme.white}
			className={styles.header}
		>
			<Flex direction='column'>
				<Title order={1} size={28} c={theme.colors.dark[6]}>
					{pageInfo[pathname].title}
				</Title>
				<Text c={theme.colors.gray[6]}>{pageInfo[pathname].subtitle}</Text>
			</Flex>
			<Flex align='center' gap={20}>
				<SidebarSearch />
				<Divider size='xs' my='xs' orientation='vertical' />
				<Link to={routes.private.settings} className={styles.linkSetting}>
					<Settings />
				</Link>
				<Divider size='xs' my='xs' orientation='vertical' />
				<Link to={routes.private.profile} className={styles.link}>
					<Avatar size='46' color='initials' radius='xl' name='hello' variant='default' />
				</Link>
			</Flex>
		</Flex>
	)
}
