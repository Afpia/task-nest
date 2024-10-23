import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChartNoAxesCombined, CircleUserRound, Moon, Sun } from 'lucide-react'

import { Loading } from '@assets/svg'
import { Box, Divider, Flex, NavLink, Switch, Text, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { AuthInterceptors } from '@utils/api/auth-interceptors'
import { getUserProjects, type ProjectsResponse } from '@utils/api/requests'

import { SidebarSearch } from './sidebar-search'

import styles from './sidebar.module.css'

// const data = [
// 	{
// 		id: 1,
// 		title: 'hello'
// 	},
// 	{
// 		id: 2,
// 		title: 'hello'
// 	},
// 	{
// 		id: 3,
// 		title: 'hello'
// 	},
// 	{
// 		id: 1,
// 		title: 'hello'
// 	},
// 	{
// 		id: 2,
// 		title: 'hello'
// 	},
// 	{
// 		id: 3,
// 		title: 'hello'
// 	},
// 	{
// 		id: 1,
// 		title: 'hello'
// 	},
// 	{
// 		id: 2,
// 		title: 'hello'
// 	},
// 	{
// 		id: 3,
// 		title: 'hello'
// 	},
// 	{
// 		id: 1,
// 		title: 'hello'
// 	},
// 	{
// 		id: 12,
// 		title: 'hello'
// 	},
// 	{
// 		id: 3,
// 		title: 'hello'
// 	},
// 	{
// 		id: 1,
// 		title: 'hello'
// 	},
// 	{
// 		id: 2,
// 		title: 'hello'
// 	},
// 	{
// 		id: 3,
// 		title: 'hello'
// 	}
// ]

export const Sidebar = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme()
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState([])
	const isDark = colorScheme === 'dark'
	const pathname = useLocation().pathname
	const theme = useMantineTheme()

	useEffect(() => {
		AuthInterceptors(setLoading)
		const fetchData = async () => {
			const response = await getUserProjects({ params: { user_id: 1 } })
			console.log(response.data)
			setData(response.data)
		}
		fetchData()
	}, [])

	return (
		<Flex
			direction='column'
			gap='xs'
			w='230px'
			h='100vh'
			p={10}
			justify='space-between'
			style={{ borderRight: `1px solid ${theme.colors.gray[3]}` }}
		>
			<Flex direction='column'>
				<Title c={theme.colors.pink[4]} order={1} size={34} className={styles.mainTitle}>
					<Link to='/'>TaskNest</Link>
				</Title>
				<Divider my='sm' />
				<Title c={theme.colors.gray[6]} order={2} size={12} className={styles.title} mb={18} mt={8}>
					Меню
				</Title>
				<Flex direction='column' gap='xs'>
					<NavLink
						component={Link}
						to='/profile'
						label='Профиль'
						variant='filled'
						leftSection={<CircleUserRound />}
						className={styles.root}
						active={pathname === '/profile'}
					/>
					<NavLink
						component={Link}
						to='/analytics'
						label='Аналитика'
						variant='filled'
						leftSection={<ChartNoAxesCombined />}
						className={styles.root}
						active={pathname === '/analytics'}
					/>
					<SidebarSearch />
				</Flex>
				<Title c={theme.colors.gray[6]} order={2} size={12} className={styles.title} mb={18} mt={18}>
					Задачи
				</Title>
				<Flex direction='column' gap='xs' h='100%' wrap='wrap'>
					{loading && <Loading />}
					{data
						?.slice(0, 11)
						?.map((item: ProjectsResponse) => (
							<NavLink
								key={item.id}
								component={Link}
								to={`/${item.id}`}
								label={`#${item.id} ${item.title}`}
								variant='filled'
								className={styles.item}
								active={pathname === `/${item.id}`}
							/>
						))}
				</Flex>
			</Flex>

			<Box mb={10}>
				<Divider my='lg' />
				<Box className={styles.switch}>
					<Text className={styles.switchText}>
						{isDark ? <Moon /> : <Sun />}
						{isDark ? 'Темная тема' : 'Светлая тема'}
					</Text>
					<Switch className={styles.switchButton} color='pink' onClick={toggleColorScheme} checked={isDark} size='md' />
				</Box>
			</Box>
		</Flex>
	)
}
