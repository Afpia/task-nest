/* eslint-disable style/operator-linebreak */
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { Bell, ChartNoAxesCombined, CircleCheck, CirclePlus, House } from 'lucide-react'

import { Avatar, Divider, Flex, Menu, NativeSelect, NavLink, Skeleton, Text, Title, useMantineTheme } from '@mantine/core'
import { path, routes } from '@shared/config'

import { $currentWorkspace, $projects, $workspaces, changedWorkspace, getUserProjectsFx } from '../model'

import { CreateProject } from './create-project'
import { SwitchTheme } from './switch-theme'

import styles from './ui.module.css'
import { useState } from 'react'

export const Sidebar = () => {
	const [workspaces, currentWorkspace, change, data, loading] = useUnit([
		$workspaces,
		$currentWorkspace,
		changedWorkspace,
		$projects,
		getUserProjectsFx.pending
	])
	const theme = useMantineTheme()
	const pathname = window.location.pathname
	const [menuOpened, setMenuOpened] = useState(false)

	const handleContextMenu = (event: React.MouseEvent) => {
		event.preventDefault()
		setMenuOpened(true)
	}

	return (
		<Flex direction='column' gap='xs' w='230px' h='100vh' p={10} justify='space-between'>
			<Flex direction='column'>
				<Title c={theme.colors.pink[4]} order={1} size={34} className={styles.mainTitle}>
					<Link to={routes.private.home}>TaskNest</Link>
				</Title>
				<Divider my='sm' variant='dashed' />
				<NativeSelect
					value={currentWorkspace.title}
					onChange={(current) => change(current.target.value)}
					className={styles.root}
					// data={workspaces.map((workspace) => ({ value: workspace.id, label: workspace.title }))}
					leftSection={<Avatar size={20} src={currentWorkspace.image_url} />}
					data={[{ value: currentWorkspace.id, label: currentWorkspace.title }]}
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
				<CreateProject />
				{!loading && data?.length > 0 && (
					<Flex direction='column' gap='xs' h='100%' wrap='wrap' align='center' justify='center'>
						{data?.slice(0, 9)?.map((item) => (
							<Menu key={item.id} opened={menuOpened} onClose={() => setMenuOpened(false)} shadow='md' width={200}>
								<Menu.Target>
									<NavLink
										component={Link}
										to={`/${item.id}`}
										onContextMenu={handleContextMenu}
										label={`#${item.id} ${item.title}`}
										variant='filled'
										className={styles.root}
										active={pathname === `/${item.id}`}
									/>
								</Menu.Target>

								<Menu.Dropdown>
									<Menu.Item>Изменить название</Menu.Item>
								</Menu.Dropdown>
							</Menu>
						))}
					</Flex>
				)}
				{/* TODO: Сделать адаптивный вывод */}
			</Flex>
			{!loading && data?.length === 0 && (
				<Flex align='center' justify='center' h='100%'>
					<Text>У вас нет проектов</Text>
				</Flex>
			)}
			{loading && (
				<Flex align='center' justify='flex-start' direction='column' gap='xs' h='100%'>
					{Array.from({ length: 9 }, (_, index) => (
						<Skeleton key={index} height={41} radius='10' />
					))}
				</Flex>
			)}
			<SwitchTheme />
		</Flex>
	)
}
