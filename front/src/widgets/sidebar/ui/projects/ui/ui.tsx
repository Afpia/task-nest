/* eslint-disable style/operator-linebreak */
import { useEffect, useRef, useState } from 'react'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { Avatar, Button, Flex, Menu, NavLink, Skeleton, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ModalUpdateProject } from '@entities/modal.update.project'
import { routes } from '@shared/config'
import { $projects, deletedProject, getProjectsWorkspaceFx, getUserWorkspacesFx } from '@shared/store'
import { openDeleteModal } from '@widgets/sidebar/ui/projects/model/index'

import { $activeProject, $menuPosition, activeProjected, setMenuPositioned } from '../model'

import { Dropdown } from './dropdown'
import { Target } from './target'

export const Projects = () => {
	const [projects, projectsLoading, loadingWorkspaces, activeProject, menuPosition, setMenuPosition] = useUnit([
		$projects,
		getProjectsWorkspaceFx.pending,
		getUserWorkspacesFx.pending,
		$activeProject,
		$menuPosition,
		setMenuPositioned
	])
	const [opened, { open, close }] = useDisclosure(false)

	const [adaptiveCount, setAdaptiveCount] = useState(0)

	const wrapper = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const updateSkeletonCount = () => {
			const containerHeight = wrapper.current?.clientHeight || 0
			const skeletonHeight = 44
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
						withArrow
						key={item.id}
						opened={menuPosition !== null && activeProject?.id === item.id}
						shadow='md'
						trigger='click'
						width={200}
						onClose={() => setMenuPosition(null)}
					>
						<Target item={item} />
						<Dropdown item={item} open={open} />
					</Menu>
				))}

			{!projectsLoading && !loadingWorkspaces && projects?.length >= adaptiveCount && (
				<Button w='100%' variant='light'>
					Смотреть все
				</Button>
			)}

			{projectsLoading && Array.from({ length: adaptiveCount }, (_, index) => <Skeleton key={index} height={40} radius='10' />)}

			{!projectsLoading && !loadingWorkspaces && projects?.length === 0 && <Text>У вас нет проектов</Text>}

			<ModalUpdateProject opened={opened} close={close} item={activeProject} />
		</Flex>
	)
}
