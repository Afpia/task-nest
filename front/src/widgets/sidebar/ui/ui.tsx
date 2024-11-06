/* eslint-disable style/operator-linebreak */
import { useEffect } from 'react'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { Bell, ChartNoAxesCombined, CircleCheck, CirclePlus, House } from 'lucide-react'

import { Divider, Flex, NativeSelect, NavLink, Skeleton, Text, Title, useMantineTheme } from '@mantine/core'
import { modals } from '@mantine/modals'
import { $user } from '@shared/auth'
import { path, routes } from '@shared/config'

import { $projects, $workspaces, getUserProjectsFx } from '../model'

import { SwitchTheme } from './switch-theme'

import styles from './ui.module.css'

export const Sidebar = () => {
	const [data, projectsFetched, loading, idUser, workspaces] = useUnit([
		$projects,
		getUserProjectsFx,
		getUserProjectsFx.pending,
		$user,
		$workspaces
	])
	const theme = useMantineTheme()
	const pathname = window.location.pathname

	const openModal = () =>
		modals.openConfirmModal({
			title: 'Вы уверены что хотите создать новый проект?',
			centered: true,
			labels: { confirm: 'Да', cancel: 'Нет' },
			onConfirm: () => console.log('Да')
		})

	// useEffect(() => {
	// 	projectsFetched(idUser.id)
	// }, [])

	return (
		<Flex direction='column' gap='xs' w='230px' h='100vh' p={10} justify='space-between'>
			<Flex direction='column'>
				<Title c={theme.colors.pink[4]} order={1} size={34} className={styles.mainTitle}>
					<Link to={routes.private.home}>TaskNest</Link>
				</Title>
				<Divider my='sm' variant='dashed' />
				<NativeSelect
					// value={value}
					// onChange={(event) => setValue(event.currentTarget.value)}
					className={styles.root}
					data={workspaces.map((workspace) => ({ value: workspace.id, label: workspace.title }))}
				/>
				<Divider my='sm' variant='dashed' />
				<Flex direction='column' gap='xs'>
					<NavLink
						component={Link}
						to={routes.private.home}
						label='Главная'
						variant='filled'
						leftSection={<House />}
						className={styles.root}
						active={pathname === path.HOME}
					/>
					<NavLink
						component={Link}
						to={routes.private.notices}
						label='Уведомления'
						variant='filled'
						leftSection={<Bell />}
						className={styles.root}
						active={pathname === path.NOTICES}
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
						to={routes.private.analytics}
						label='Аналитика'
						variant='filled'
						leftSection={<ChartNoAxesCombined />}
						className={styles.root}
						active={pathname === path.ANALYTICS}
					/>
				</Flex>
				<Divider my='sm' variant='dashed' />
				<Flex align='center' justify='space-between' mb={18}>
					<Title c={theme.colors.gray[6]} order={2} size={12} className={styles.title}>
						Проекты
					</Title>
					<CirclePlus size='16' className={styles.addProject} onClick={openModal} />
				</Flex>

				{!loading && data.length > 0 && (
					<Flex direction='column' gap='xs' h='100%' wrap='wrap' align='center' justify='center'>
						{data
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
							))}
						{/* TODO: Сделать адаптивный вывод */}
					</Flex>
				)}
			</Flex>

			{!loading && data.length === 0 && (
				<Flex align='center' justify='center' h='100%'>
					<Text>У вас нет проектов</Text>
				</Flex>
			)}
			{loading && (
				<Flex align='center' justify='flex-start' direction='column' gap='xs' h='100%'>
					{Array.from({ length: 5 }, (_, index) => (
						<Skeleton key={index} height={41} radius='10' />
					))}
				</Flex>
			)}
			<SwitchTheme />
		</Flex>
	)
}
