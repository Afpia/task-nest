import { Link } from 'atomic-router-react'
import { Bell, ChartNoAxesCombined, CircleCheck, House } from 'lucide-react'

import { Divider, Flex, NavLink, Title } from '@mantine/core'

import { routes } from '@shared/config'

import { CreateProject } from './create-project'
import { Projects } from './projects'
import { SelectWorkspace } from './select-workspace'
import { SwitchTheme } from './switch-theme'

export const Sidebar = () => (
	<Flex direction='column' w='230px' h='100vh' p={10} justify='space-between'>
		<Flex direction='column'>
			<Title ff='Pacifico' order={1} size={34} style={{ textAlign: 'center' }}>
				<Link to={routes.private.home} style={{ textDecoration: 'none', color: 'inherit' }}>
					TaskNest
				</Link>
			</Title>
			<Divider my='sm' variant='dashed' />
			<SelectWorkspace />
			<Divider my='sm' variant='dashed' />
			<Flex direction='column' gap='xs'>
				<NavLink
					component={Link}
					to={routes.private.home}
					label='Главная'
					variant='filled'
					leftSection={<House />}
					style={{ borderRadius: '10px' }}
					active={routes.private.home.$isOpened.getState()}
				/>
				<NavLink
					component={Link}
					to={routes.private.notices}
					label='Уведомления'
					variant='filled'
					leftSection={<Bell />}
					style={{ borderRadius: '10px' }}
					active={routes.private.notices.$isOpened.getState()}
				/>
				<NavLink
					component={Link}
					to={routes.private.tasks}
					label='Мои задачи'
					variant='filled'
					leftSection={<CircleCheck />}
					style={{ borderRadius: '10px' }}
					active={routes.private.tasks.$isOpened.getState()}
				/>
				<NavLink
					component={Link}
					to={routes.private.analytics}
					label='Аналитика'
					variant='filled'
					leftSection={<ChartNoAxesCombined />}
					style={{ borderRadius: '10px' }}
					active={routes.private.analytics.$isOpened.getState()}
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
