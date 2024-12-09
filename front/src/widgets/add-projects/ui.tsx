import { useEffect, useMemo, useState } from 'react'
import { useUnit } from 'effector-react'
import { Plus } from 'lucide-react'

import {
	closestCenter,
	closestCorners,
	DndContext,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
	type DragStartEvent
} from '@dnd-kit/core'
import {
	arrayMove,
	rectSwappingStrategy,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { Box, Button, Divider, Flex, Grid, ScrollArea, Title } from '@mantine/core'

import { $projects } from '@shared/store'
import { ProjectResponse, ProjectsResponse } from '@shared/types'

import { $projectsWidget, getterProjectsPosition } from './model'
import { SortableItem } from './ui/sortable-item'

export const AddProjects = () => {
	const [projects, getProjectPosition] = useUnit([$projects, getterProjectsPosition])

	const [activeTask, setActiveTask] = useState<number | string | null>(null)

	const [items, setItems] = useState(projects)

	useEffect(() => {
		setItems([
			{ id: -1, title: 'Добавление проекта', description: '', start_date: '', status: '', remaining_days: 0, image_url: '' },
			...projects
		])
	}, [projects])

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const getTaskPos = (id: number | string) => items.findIndex((item) => item.id === id)

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event

		if (over !== null && active.id !== over.id) {
			setItems((item) => {
				const oldIndex = getTaskPos(active.id)
				const newIndex = getTaskPos(over.id)

				return arrayMove(item, oldIndex, newIndex)
			})
		}
	}

	function onDragStartEvent(event: DragStartEvent) {
		setActiveTask(event.active.id)
	}

	return (
		<Box p={20} style={{ borderRadius: '20px' }} w='600px' h='350px' bd='1px solid #D9D9D9'>
			<Title order={2} size={20} fw={600}>
				Проекты
			</Title>
			<Divider my='sm' variant='dashed' />
			<ScrollArea scrollbars='y' style={{ overflow: 'hidden' }}>
				<DndContext
					sensors={sensors}
					onDragStart={onDragStartEvent}
					collisionDetection={closestCorners}
					onDragEnd={handleDragEnd}
				>
					<Grid h='285px' gutter='10' styles={{ inner: { maxWidth: '558px' } }}>
						{items && (
							<SortableContext items={items} strategy={rectSwappingStrategy}>
								{items.map((item) => (
									<Grid.Col span={6} key={item.id}>
										<SortableItem {...item} />
									</Grid.Col>
								))}
								<DragOverlay>
									{items
										.filter((item) => item.id === activeTask)
										.map((item) => (
											<SortableItem key={item.id} {...item} />
										))}
								</DragOverlay>
							</SortableContext>
						)}
					</Grid>
				</DndContext>
			</ScrollArea>
		</Box>
	)
}
