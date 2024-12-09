import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { Bell, ChartNoAxesCombined, CircleCheck, House } from 'lucide-react'

import { Avatar, Divider, Flex, NavLink, Select, Title, useMantineTheme } from '@mantine/core'

import { path, routes } from '@shared/config'
import { $currentWorkspace, $workspaces, changedWorkspace } from '@shared/store'

import { CreateProject } from './create-project'
import { Projects } from './projects'
import { SwitchTheme } from './switch-theme'

import styles from './ui.module.css'

export const Sidebar = () => {
	const [workspaces, currentWorkspace, change] = useUnit([$workspaces, $currentWorkspace, changedWorkspace])
	const theme = useMantineTheme()
	const pathname = window.location.pathname

	return (
		<Flex direction='column' w='230px' h='100vh' p={10} justify='space-between'>
			<Flex direction='column'>
				<Title c={theme.colors.pink[4]} order={1} size={34} className={styles.mainTitle}>
					<Link to={routes.private.home}>TaskNest</Link>
				</Title>
				<Divider my='sm' variant='dashed' />
				<Select
					value={currentWorkspace.title}
					onChange={(current) => change(current!)}
					allowDeselect={false}
					data={workspaces.map((workspace) => ({ value: workspace.title, label: workspace.title }))}
					comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
					leftSection={<Avatar size={20} src={currentWorkspace.image_url} />}
					styles={{
						input: {
							borderRadius: '10px'
						}
					}}
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
			</Flex>
			<Projects />
			<Divider my='lg' variant='dashed' />
			<SwitchTheme />
		</Flex>
	)
}
