/* eslint-disable style/operator-linebreak */
import { useEffect, useRef, useState } from 'react'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { Flex, Menu, NavLink, Skeleton, Text } from '@mantine/core'
import { routes } from '@shared/config'
import { $projects, getUserProjectsFx, getUserWorkspacesFx } from '@widgets/sidebar/model'

export const Projects = () => {
	const [projects, projectsLoading, loadingWorkspaces] = useUnit([
		$projects,
		getUserProjectsFx.pending,
		getUserWorkspacesFx.pending
	])

	const [adaptiveCount, setAdaptiveCount] = useState(0)
	const pathname = window.location.pathname
	const wrapper = useRef<HTMLDivElement>(null)

	const [menuOpened, setMenuOpened] = useState(false)

	const handleContextMenu = (event: React.MouseEvent) => {
		event.preventDefault()
		setMenuOpened(true)
	}

	useEffect(() => {
		const updateSkeletonCount = () => {
			const containerHeight = wrapper.current?.clientHeight || 0
			const skeletonHeight = 40
			const gapHeight = 10
			const totalItemHeight = skeletonHeight + gapHeight

			setAdaptiveCount(Math.floor(containerHeight / totalItemHeight))
		}
		updateSkeletonCount()
		window.addEventListener('resize', updateSkeletonCount)

		return () => {
			window.removeEventListener('resize', updateSkeletonCount)
		}
	}, [projects])

	return (
		<Flex
			direction='column'
			gap='xs'
			ref={wrapper}
			h='100%'
			wrap='wrap'
			align='center'
			justify={!projectsLoading && !loadingWorkspaces && projects?.length === 0 ? 'center' : 'flex-start'}
		>
			{!projectsLoading &&
				projects?.length > 0 &&
				projects?.slice(0, adaptiveCount)?.map((item) => (
					<Menu
						key={item.id}
						opened={menuOpened}
						onClose={() => setMenuOpened(false)}
						shadow='md'
						width={200}
						position='right-end'
					>
						<Menu.Target>
							<NavLink
								component={Link}
								to={routes.private.project as unknown as string}
								params={{ projectId: item.id.toString() }}
								onContextMenu={handleContextMenu}
								label={item.title}
								variant='filled'
								style={{ borderRadius: '10px' }}
								active={pathname === `${routes.private.project}`}
							/>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item>Изменить название</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				))}

			{!projectsLoading && projects?.length > adaptiveCount && <p>Смотреть все</p>}

			{projectsLoading && Array.from({ length: adaptiveCount }, (_, index) => <Skeleton key={index} height={40} radius='10' />)}

			{!projectsLoading && !loadingWorkspaces && projects?.length === 0 && <Text>У вас нет проектов</Text>}
		</Flex>
	)
}
