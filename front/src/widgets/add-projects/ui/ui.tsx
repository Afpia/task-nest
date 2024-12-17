import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { Settings2 } from 'lucide-react'

import {
	closestCorners,
	DndContext,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent
} from '@dnd-kit/core'
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { ActionIcon, Box, Divider, Flex, Grid, ScrollArea, Skeleton, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ModalCreateProject } from '@entities/modal.create.project'
import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'
import { getProjectsWorkspaceFx } from '@shared/store'

import { $activeProject, $projectsWidget, changedActiveProject, changedPositionItem } from '../model'

import { SortableItem } from './sortable-item'

export const AddProjects = () => {
	const [loading, projects, changePosition, activeProject, changeActive] = useUnit([
		getProjectsWorkspaceFx.pending,
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
			p={20}
			style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative' }}
			w='50%'
			h='350px'
			bd='1px solid #D9D9D9'
			bg={isDark ? ThemeColors.dark : ThemeColors.light}
		>
			<Flex justify='space-between' pr={15} h={36}>
				<Title order={2} size={20} fw={600}>
					Проекты
				</Title>
				<ActionIcon h='100%' w='35px' variant='default' aria-label='Settings'>
					<Settings2 style={{ width: '70%', height: '70%' }} />
				</ActionIcon>
			</Flex>
			<Divider my='sm' variant='dashed' />
			<ScrollArea scrollbars='y' h='270px'>
				<DndContext
					sensors={sensors}
					onDragStart={(event) => changeActive(event.active.id)}
					collisionDetection={closestCorners}
					onDragEnd={handleDragEnd}
				>
					<Grid h='100%' styles={{ inner: { maxWidth: '100%' } }}>
						{projects && (
							<SortableContext items={projects} strategy={rectSortingStrategy}>
								{projects.map((item) => (
									<Grid.Col span={4} key={item.id}>
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
						{/* eslint-disable-next-line style/operator-linebreak */}
						{loading &&
							Array.from({ length: 8 }).map((_, index) => (
								// eslint-disable-next-line react/no-array-index-key
								<Grid.Col span={4} key={index}>
									<Skeleton mih={70} w='100%' radius='md' />
								</Grid.Col>
							))}
					</Grid>
				</DndContext>
			</ScrollArea>
			<ModalCreateProject opened={opened} close={close} />
			<Box
				style={{
					position: 'absolute',
					zIndex: 1,
					bottom: 0,
					pointerEvents: 'none',
					left: 0,
					right: 0,
					height: '60px'
				}}
				bg={
					!isDark
						? `linear-gradient(to top, ${ThemeColors.light}, ${ThemeColors.thirdLight})`
						: `linear-gradient(to top, ${ThemeColors.dark}, ${ThemeColors.thirdDark})`
				}
			/>
		</Box>
	)
}
