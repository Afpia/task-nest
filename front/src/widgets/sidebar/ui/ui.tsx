import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUnit } from 'effector-react'
import { Bell, ChartNoAxesCombined, CircleCheck, CirclePlus, House } from 'lucide-react'

import { Loading } from '@app/assets/svg'
import { Divider, Flex, NativeSelect, NavLink, Skeleton, Title, useMantineTheme } from '@mantine/core'
import { modals } from '@mantine/modals'
import { routes } from '@shared/config'

import { getUserProjectsModel } from '../model'

import { SwitchTheme } from './switch-theme'

import styles from './ui.module.css'

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
	const pathname = useLocation().pathname
	const theme = useMantineTheme()

	useEffect(() => {
		// AuthInterceptors(setLoading)
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
				<NativeSelect
					// value={value}
					// onChange={(event) => setValue(event.currentTarget.value)}
					className={styles.root}
					data={['Default', '1', '2', '3']}
				/>
				<Divider my='sm' variant='dashed' />
				<Flex direction='column' gap='xs'>
					<NavLink
						component={Link}
						to={routes.MAIN}
						label='Главная'
						variant='filled'
						leftSection={<House />}
						className={styles.root}
						active={pathname === routes.MAIN}
					/>
					<NavLink
						component={Link}
						to={routes.NOTICES}
						label='Уведомления'
						variant='filled'
						leftSection={<Bell />}
						className={styles.root}
						active={pathname === routes.NOTICES}
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
						to={routes.ANALYTICS}
						label='Аналитика'
						variant='filled'
						leftSection={<ChartNoAxesCombined />}
						className={styles.root}
						active={pathname === routes.ANALYTICS}
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
					{/* {data
						?.slice(0, 9)
						?.map((item) => (
							<NavLink
								key={item.id}
								component={Link}
								to={`/${item.id}`}
								label={`#${item.id} ${item.title}`}
								variant='filled'
								className={styles.root}
								active={pathname === `/${item.id}`}
							/>
						))} */}
				</Flex>
			</Flex>
			<Flex align='center' justify='center' direction='column' gap='xs'>
				{/* {true && Array.from({ length: 5 }, (_, index) => <Skeleton key={index} height={41} radius='10' />)} */}
			</Flex>
			<SwitchTheme />
		</Flex>
	)
}
