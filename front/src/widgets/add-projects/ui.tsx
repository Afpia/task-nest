import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { Plus } from 'lucide-react'

import {
	closestCenter,
	closestCorners,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent
} from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Box, Button, Divider, Flex, Grid, Title } from '@mantine/core'

import { $projects } from '@shared/store'
import { ProjectsResponse } from '@shared/types'

import { SortableItem } from './ui/sortable-item'

export const AddProjects = () => {
	const [projects] = useUnit([$projects])
	const [items, setItems] = useState<ProjectsResponse | null>(null)
	console.log(items)
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)
	useEffect(() => {
		setItems(projects)
	}, [projects])
	// const draggableMarkup = (
	// 	<Button
	// 		bd='1px solid #D9D9D9'
	// 		style={{ borderRadius: '10px' }}
	// 		leftSection={
	// 			<ActionIcon
	// 				variant='light'
	// 				radius='xl'
	// 				size='lg'
	// 				style={{
	// 					border: '1px dashed #cccccc',
	// 					backgroundColor: '#f7f7f7'
	// 				}}
	// 			>
	// 				<Plus size={18} color='#cccccc' />
	// 			</ActionIcon>
	// 		}
	// 		w='100%'
	// 		h='100%'
	// 		variant='outline'
	// 		p={10}
	// 		justify='flex-start'
	// 	>
	// 		Новый проект
	// 	</Button>
	// )

	return (
		<Box p={20} style={{ borderRadius: '20px' }} w='40%' bd='1px solid #D9D9D9'>
			<Title order={2} size={20} fw={600}>
				Проекты
			</Title>
			<Divider my='sm' variant='dashed' />
			<DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
				<Flex direction='column'>
					{items && (
						<SortableContext items={items} strategy={verticalListSortingStrategy}>
							{items.map((item) => (
								<SortableItem key={item.id} {...item} />
							))}
						</SortableContext>
					)}
				</Flex>
			</DndContext>
		</Box>
	)

	function handleDragEnd(event) {
		const { active, over } = event

		if (active.id !== over.id) {
			setItems((item) => {
				const oldIndex = item.indexOf(active.id)
				const newIndex = item.indexOf(over.id)

				return arrayMove(item, oldIndex, newIndex)
			})
		}
	}
}
