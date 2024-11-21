import { useState } from 'react'
import { DndContext, type DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core'
import { Plus } from 'lucide-react'

import { ActionIcon, Box, Button, Divider, Flex, Grid, Title } from '@mantine/core'

export const AddProjects = () => {
	const [isDropped, setIsDropped] = useState(false)

	const { isOver, setNodeRef } = useDroppable({
		id: 'droppable'
	})

	const {
		attributes,
		listeners,
		setNodeRef: dragRef,
		transform
	} = useDraggable({
		id: 'draggable'
	})

	const styleDroppable = {
		color: isOver ? 'green' : undefined
	}

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
			}
		: undefined

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

	const draggableMarkup = (
		<button style={style} ref={dragRef} {...listeners} {...attributes}>
			hello
		</button>
	)

	return (
		<Box p={20} style={{ borderRadius: '20px' }} w='40%' bd='1px solid #D9D9D9'>
			<Title order={2} size={20} fw={600}>
				Проекты
			</Title>
			<Divider my='sm' variant='dashed' />
			<DndContext onDragEnd={handleDragEnd}>
				<Grid columns={2}>
					<Grid.Col span={1}>{!isDropped ? draggableMarkup : null}</Grid.Col>
					<Grid.Col span={1} style={styleDroppable} ref={setNodeRef}>
						{isDropped ? draggableMarkup : 'Drop here'}
					</Grid.Col>
				</Grid>
			</DndContext>
		</Box>
	)
	function handleDragEnd(event: DragEndEvent) {
		if (event.over && event.over.id === 'droppable') {
			setIsDropped(true)
		}
	}
}
