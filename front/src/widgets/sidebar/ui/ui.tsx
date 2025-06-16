import { Link } from 'atomic-router-react'
import { ChartNoAxesCombined, House } from 'lucide-react'

import { Divider, Flex, NavLink, Title } from '@mantine/core'

import { routes } from '@shared/config'

import { CreateProject } from './create-project'
import { Projects } from './projects'
import { SelectWorkspace } from './select-workspace'
import { SwitchTheme } from './switch-theme'

export const Sidebar = () => (
	<Flex h='100vh' justify='space-between' p={10} w='230px' direction='column'>
		<Flex direction='column'>
			<Title ff='Pacifico' size={34} style={{ textAlign: 'center' }} order={1}>
				<Link style={{ textDecoration: 'none', color: 'inherit' }} to={routes.private.home}>
					TaskNest
				</Link>
			</Title>
			<Divider my='sm' variant='dashed' />
			<SelectWorkspace />
			<Divider my='sm' variant='dashed' />
			<Flex gap='xs' direction='column'>
				<NavLink
					active={routes.private.home.$isOpened.getState()}
					label='Главная'
					style={{ borderRadius: '10px' }}
					variant='filled'
					component={Link}
					leftSection={<House />}
					to={routes.private.home}
				/>
				{/* <NavLink
					active={routes.private.notices.$isOpened.getState()}
					label='Уведомления'
					style={{ borderRadius: '10px' }}
					variant='filled'
					component={Link}
					leftSection={<Bell />}
					to={routes.private.notices}
				/>
				<NavLink
					active={routes.private.tasks.$isOpened.getState()}
					label='Мои задачи'
					style={{ borderRadius: '10px' }}
					variant='filled'
					component={Link}
					leftSection={<CircleCheck />}
					to={routes.private.tasks}
				/> */}
				<NavLink
					active={routes.private.analytics.$isOpened.getState()}
					label='Аналитика'
					style={{ borderRadius: '10px' }}
					variant='filled'
					component={Link}
					leftSection={<ChartNoAxesCombined />}
					to={routes.private.analytics}
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
