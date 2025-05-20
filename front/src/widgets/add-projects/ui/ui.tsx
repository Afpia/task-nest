import { useUnit } from 'effector-react'
import { Settings2 } from 'lucide-react'

import type { DragEndEvent } from '@dnd-kit/core'
import { closestCorners, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { ActionIcon, Box, Divider, Flex, Grid, ScrollArea, Skeleton, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ModalCreateProject } from '@entities/create-project-modal'
import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'
import { getProjectsWorkspaceFx } from '@shared/store'

import { $activeProject, $projectsWidget, changedActiveProject, changedPositionItem } from '../model'

import { SortableItem } from './sortable-item'

export const AddProjects = () => {
	const [loading, projects, changePosition, activeProject, changeActive] = useUnit([
		getProjectsWorkspaceFx.$pending,
		$projectsWidget,
		changedPositionItem,
		$activeProject,
		changedActiveProject
	])
	const { isDark } = isDarkMode()
	const [opened, { open, close }] = useDisclosure(false)

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const getTaskPos = (id: number | string) => projects.findIndex((item) => item.id === id)

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event

		if (over !== null && active.id !== over.id) {
			const oldIndex = getTaskPos(active.id)
			const newIndex = getTaskPos(over.id)

			changePosition(arrayMove(projects, oldIndex, newIndex))
		}
	}

	return (
		<Box
			bd={`1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}`}
			bg={isDark ? ThemeColors.dark : ThemeColors.light}
			h='320px'
			p={20}
			style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative' }}
			w='50%'
		>
			<Flex h={36} justify='space-between'>
				<Title fw={600} size={20} order={2}>
					Проекты
				</Title>
				<ActionIcon aria-label='Settings' h='100%' variant='default' w='35px'>
					<Settings2 style={{ width: '70%', height: '70%' }} />
				</ActionIcon>
			</Flex>
			<Divider my='sm' variant='dashed' />
			<ScrollArea h='220px' scrollbars='y'>
				<DndContext
					collisionDetection={closestCorners}
					onDragEnd={handleDragEnd}
					onDragStart={(event) => changeActive(event.active.id)}
					sensors={sensors}
				>
					<Grid h='100%' styles={{ inner: { maxWidth: '100%', margin: '0 auto' } }}>
						{projects && (
							<SortableContext items={projects} strategy={rectSortingStrategy}>
								{projects.map((item) => (
									<Grid.Col key={item.id} p={5} span={4}>
										<SortableItem {...item} open={open} />
									</Grid.Col>
								))}
								<DragOverlay>
									{projects
										.filter((item) => item.id === activeProject)
										.map((item) => (
											<SortableItem key={item.id} {...item} />
										))}
								</DragOverlay>
							</SortableContext>
						)}
						{loading &&
							Array.from({ length: 8 }).map((_, index) => (
								<Grid.Col key={index} p={5} span={4}>
									<Skeleton mih={70} radius='md' w='100%' />
								</Grid.Col>
							))}
					</Grid>
				</DndContext>
			</ScrollArea>
			<ModalCreateProject close={close} opened={opened} />
			<Box
				bg={
					!isDark
						? `linear-gradient(to top, ${ThemeColors.light}, ${ThemeColors.thirdLight})`
						: `linear-gradient(to top, ${ThemeColors.dark}, ${ThemeColors.thirdDark})`
				}
				style={{
					position: 'absolute',
					zIndex: 1,
					bottom: 0,
					pointerEvents: 'none',
					left: 0,
					right: 0,
					height: '60px'
				}}
			/>
		</Box>
	)
}
