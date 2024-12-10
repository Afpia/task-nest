/* eslint-disable style/operator-linebreak */
import { useEffect, useRef, useState } from 'react'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { Avatar, Button, Flex, Menu, NavLink, Skeleton, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'

import { ModalUpdateProject } from '@entities/modal.update.project'
import { routes } from '@shared/config'
import { $projects, deletedProject, getProjectsWorkspaceFx, getUserWorkspacesFx } from '@shared/store'
import { ProjectResponse } from '@shared/types'

export const Projects = () => {
	const [projects, projectsLoading, loadingWorkspaces, deleteProject] = useUnit([
		$projects,
		getProjectsWorkspaceFx.pending,
		getUserWorkspacesFx.pending,
		deletedProject
	])
	const [opened, { open, close }] = useDisclosure(false)

	const [activeProject, setActiveProject] = useState<ProjectResponse | null>(null)
	const [adaptiveCount, setAdaptiveCount] = useState(0)
	const pathname = window.location.pathname
	const wrapper = useRef<HTMLDivElement>(null)

	// eslint-disable-next-line style/member-delimiter-style
	const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null)

	const handleContextMenu = (event: React.MouseEvent, item: ProjectResponse) => {
		event.preventDefault()
		setActiveProject(item)
		setMenuPosition({ x: event.clientX, y: event.clientY })
	}

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

	const openDeleteModal = ({ id }: { id: number }) =>
		modals.openConfirmModal({
			title: 'Удалить проект',
			centered: true,
			children: (
				<Text size='sm'>Вы уверены, что хотите удалить проект? Это действие удалит проект без права на восстановление.</Text>
			),
			labels: { confirm: 'Удалить проект', cancel: 'Отмена' },
			confirmProps: { color: 'red' },
			onConfirm: () => deleteProject({ id })
		})

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
						<Menu.Target>
							<NavLink
								component={Link}
								to={routes.private.project as unknown as string}
								params={{ projectId: item.id.toString() }}
								onContextMenu={(event) => handleContextMenu(event, item)}
								label={item.title}
								variant='filled'
								leftSection={<Avatar size={25} radius='sm' src={item.image_url} alt={item.title} />}
								style={{ borderRadius: '10px' }}
								active={pathname === `${routes.private.project}`}
							/>
						</Menu.Target>
						<Menu.Dropdown styles={{ dropdown: { top: menuPosition?.y, left: menuPosition?.x } }}>
							<Menu.Item onClick={open}>Изменить название</Menu.Item>
							<Menu.Item onClick={() => openDeleteModal({ id: item.id })}>Удалить проект</Menu.Item>
						</Menu.Dropdown>
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
