import { Settings2 } from 'lucide-react'

import type { DragEndEvent } from '@dnd-kit/core'
import { closestCorners, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ActionIcon, Box, Divider, Flex, ScrollArea, Select, Skeleton, Title } from '@mantine/core'

import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'

const projects = [
	{
		id: '1',
		title: 'Задачи 1'
	}
]

export const AssignedTasks = () => {
	const { isDark } = isDarkMode()
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

			// changePosition(arrayMove(projects, oldIndex, newIndex))
		}
	}

	return (
		<Box
			bd={`1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}`}
			h='350px'
			p={20}
			style={{ borderRadius: '20px' }}
			w='50%'
		>
			<Flex h={36} justify='space-between'>
				<Title fw={600} size={20} order={2}>
					Назначенные задачи
				</Title>
				<Flex gap={10}>
					<Select data={['По дате возрастания', 'По дате убывания']} defaultValue='По дате возрастания' allowDeselect={false} />
					<ActionIcon aria-label='Settings' h='100%' variant='default' w='35px'>
						<Settings2 style={{ width: '70%', height: '70%' }} />
					</ActionIcon>
				</Flex>
			</Flex>
			<Divider my='sm' variant='dashed' />
			<ScrollArea h='270px' scrollbars='y'>
				<DndContext
					collisionDetection={closestCorners}
					onDragEnd={handleDragEnd}
					// onDragStart={(event) => changeActive(event.active.id)}
					sensors={sensors}
				>
					<Flex h='100%'>
						{projects && (
							<SortableContext items={projects} strategy={verticalListSortingStrategy}>
								{projects.map((item) => (
									// eslint-disable-next-line no-inline-comments
									<Flex key={item.id}>{/* <SortableItem {...item} /> */}</Flex>
								))}
								{/* <DragOverlay>
									{projects
										.filter((item) => item.id === activeProject)
										.map((item) => (
											<SortableItem key={item.id} {...item} />
										))}
								</DragOverlay> */}
							</SortableContext>
						)}
						{/* {loading &&
							Array.from({ length: 3 }).map((_, index) => (
								<Flex key={index}>
									<Skeleton mih={70} radius='md' w='100%' />
								</Flex>
							))} */}
					</Flex>
				</DndContext>
			</ScrollArea>
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
