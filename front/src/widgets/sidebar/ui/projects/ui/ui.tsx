import { useEffect, useRef, useState } from 'react'
import { useUnit } from 'effector-react'

import { Button, Flex, Menu, Skeleton, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ModalUpdateProject } from '@entities/modal.update.project'
import { $projects, getProjectsWorkspaceFx, getUserWorkspacesFx } from '@shared/store'

import { $activeProject, $menuPosition, setMenuPositioned } from '../model'

import { Dropdown } from './dropdown'
import { Target } from './target'

export const Projects = () => {
	const [projects, projectsLoading, loadingWorkspaces, activeProject, menuPosition, setMenuPosition] = useUnit([
		$projects,
		getProjectsWorkspaceFx.$pending,
		getUserWorkspacesFx.$pending,
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
			align='center'
			gap='xs'
			h='100%'
			justify={!projectsLoading && !loadingWorkspaces && projects?.length === 0 ? 'center' : 'flex-start'}
			ref={wrapper}
			wrap='wrap'
			direction='column'
		>
			{!projectsLoading &&
				projects?.length > 0 &&
				projects?.slice(0, adaptiveCount)?.map((item) => (
					<Menu
						key={item.id}
						trigger='click'
						width={200}
						onClose={() => setMenuPosition(null)}
						opened={menuPosition !== null && activeProject?.id === item.id}
						shadow='md'
					>
						<Target item={item} />
						<Dropdown item={item} open={open} />
					</Menu>
				))}

			{!projectsLoading && !loadingWorkspaces && projects?.length >= adaptiveCount && (
				<Button variant='light' w='100%'>
					Смотреть все
				</Button>
			)}

			{projectsLoading && Array.from({ length: adaptiveCount }, (_, index) => <Skeleton height={40} key={index} radius='10' />)}

			{!projectsLoading && !loadingWorkspaces && projects?.length === 0 && <Text>У вас нет проектов</Text>}

			<ModalUpdateProject item={activeProject} close={close} opened={opened} />
		</Flex>
	)
}
