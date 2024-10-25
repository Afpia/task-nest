import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChartNoAxesCombined, CircleCheck, CirclePlus, CircleUserRound, House, Moon, Settings, Sun } from 'lucide-react'
import { Loading } from 'src/app/assets/svg'

import { Box, Divider, Flex, NavLink, Switch, Text, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { modals } from '@mantine/modals'
import { AuthInterceptors } from '@utils/api/auth-interceptors'
import { getUserProjects, type ProjectsResponse } from '@utils/api/requests'

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

	const openModal = () =>
		modals.openConfirmModal({
			title: 'Вы уверены что хотите создать новый проект?',
			centered: true,
			labels: { confirm: 'Да', cancel: 'Нет' },
			onConfirm: () => console.log('Да')
		})

	return (
		<Flex direction='column' gap='xs' w='230px' h='100vh' p={10} justify='space-between'>
			<Flex direction='column'>
				<Title c={theme.colors.pink[4]} order={1} size={34} className={styles.mainTitle}>
					<Link to='/'>TaskNest</Link>
				</Title>
				<Divider my='sm' variant='dashed' />
				<Flex direction='column' gap='xs'>
					<NavLink
						component={Link}
						to='/'
						label='Главная'
						variant='filled'
						leftSection={<House />}
						className={styles.root}
						active={pathname === '/'}
					/>
					<NavLink
						component={Link}
						to='/tasks'
						label='Мои задачи'
						variant='filled'
						leftSection={<CircleCheck />}
						className={styles.root}
						active={pathname === '/tasks'}
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
				</Flex>
				<Divider my='sm' variant='dashed' />
				<Flex align='center' justify='space-between' mb={18}>
					<Title c={theme.colors.gray[6]} order={2} size={12} className={styles.title}>
						Проекты
					</Title>
					<CirclePlus size='16' className={styles.addProject} onClick={openModal} />
				</Flex>
				<Flex direction='column' gap='xs' h='100%' wrap='wrap' align='center' justify='center'>
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
			<Flex align='center' justify='center'>
				{loading && <Loading />}
			</Flex>
			<Box mb={10}>
				{/* <Text className={styles.settings} ml={10}>
					<Link to='settings' className={styles.switchText}>
						<Settings />
						Настройки
					</Link>
				</Text> */}
				<Divider my='lg' variant='dashed' />
				<Box className={styles.switch}>
					<Text className={styles.switchText} ml={10}>
						{isDark ? <Moon /> : <Sun />}
						{isDark ? 'Темная тема' : 'Светлая тема'}
					</Text>
					<Switch className={styles.switchButton} color='pink' onClick={toggleColorScheme} checked={isDark} size='md' />
				</Box>
			</Box>
		</Flex>
	)
}
