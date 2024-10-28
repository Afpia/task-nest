import { Link, useLocation } from 'react-router-dom'
import { Settings } from 'lucide-react'

import { SidebarSearch } from '@features/search'
import { Avatar, Divider, Flex, Text, Title, useMantineTheme } from '@mantine/core'
import { routes } from '@shared/config'

import styles from './ui.module.css'

export const Header = () => {
	const theme = useMantineTheme()
	const location = useLocation()

	const pageInfo = {
		[routes.MAIN]: { title: 'Главная', subtitle: 'Контролируйте все свои проекты и задачи здесь' },
		[routes.SETTINGS]: { title: 'Настройки', subtitle: 'Настройте свой профиль и предпочтения' },
		[routes.PROFILE]: { title: 'Профиль', subtitle: 'Просмотр и редактирование профиля' },
		[routes.ANALYTICS]: { title: 'Аналитика', subtitle: '' }
	}

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
					{pageInfo[location.pathname].title}
				</Title>
				<Text c={theme.colors.gray[6]}>{pageInfo[location.pathname].subtitle}</Text>
			</Flex>
			<Flex align='center' gap={20}>
				<SidebarSearch />
				<Divider size='xs' my='xs' orientation='vertical' />
				<Link to={routes.SETTINGS} className={styles.linkSetting}>
					<Settings />
				</Link>
				<Divider size='xs' my='xs' orientation='vertical' />
				<Link to={routes.PROFILE} className={styles.link}>
					<Avatar size='46' color='initials' radius='xl' name='hello' variant='default' />
				</Link>
			</Flex>
		</Flex>
	)
}
