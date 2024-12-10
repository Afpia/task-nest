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
import { $projects, getProjectsWorkspaceFx } from '@shared/store'

import { SortableItem } from './sortable-item'

export const AddProjects = () => {
	const [projects, loading] = useUnit([$projects, getProjectsWorkspaceFx.pending])
	const [opened, { open, close }] = useDisclosure(false)

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

	return (
		<Box p={20} style={{ borderRadius: '20px', overflow: 'hidden' }} w='100%' h='350px' bd='1px solid #D9D9D9'>
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
					onDragStart={(event) => setActiveTask(event.active.id)}
					collisionDetection={closestCorners}
					onDragEnd={handleDragEnd}
				>
					<Grid h='100%' styles={{ inner: { maxWidth: '100%' } }}>
						{items && (
							<SortableContext items={items} strategy={rectSortingStrategy}>
								{items.map((item) => (
									<Grid.Col span={4} key={item.id}>
										<SortableItem {...item} open={open} />
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
		</Box>
	)
}
