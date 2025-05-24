import { useState } from 'react'
import { useUnit } from 'effector-react'
import { BringToFront, Settings2 } from 'lucide-react'

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
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ActionIcon, Box, Divider, Flex, Menu, ScrollArea, Select, Skeleton, Title } from '@mantine/core'

import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'
import { getUserWorkspacesFx } from '@shared/store'
// FIXME: Исправить import вынести глобально данный запрос
import { $tasks, getWorkspaceTasksFx } from '@widgets/stats-workspace/model'

import { $activeTask, changedActiveTask, changedOrder, changedPositionItem } from '../model'

import { SortableItem } from './sortable-item'

export const AssignedTasks = () => {
	const [workspaceLoading, tasksLoading, tasks, changeActive, activeTask, changePosition, changeOrder] = useUnit([
		getUserWorkspacesFx.$pending,
		getWorkspaceTasksFx.$pending,
		$tasks,
		changedActiveTask,
		$activeTask,
		changedPositionItem,
		changedOrder
	])
	const [dragEnabled, setDragEnabled] = useState(false)

	const { isDark } = isDarkMode()
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const getTaskPos = (id: number | string) => tasks.findIndex((item) => item.id === id)

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event

		if (over !== null && active.id !== over.id) {
			const oldIndex = getTaskPos(active.id)
			const newIndex = getTaskPos(over.id)

			changePosition(arrayMove(tasks, oldIndex, newIndex))
		}
	}

	return (
		<Box
			bd={`1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}`}
			h='320px'
			p={20}
			style={{ borderRadius: '20px' }}
			w='50%'
		>
			<Flex h={36} justify='space-between'>
				<Title fw={600} size={20} order={2}>
					Назначенные задачи
				</Title>
				<Flex gap={10}>
					<Select
						defaultValue='asc'
						data={[
							{ value: 'asc', label: 'По дате возрастания' },
							{ value: 'desc', label: 'По дате убывания' }
						]}
						allowDeselect={false}
						onChange={(value) => changeOrder(value as 'asc' | 'desc')}
					/>
					<Menu position='bottom-end' shadow='sm' withinPortal>
						<Menu.Target>
							<ActionIcon aria-label='Settings' h='100%' variant='default' w='35px'>
								<Settings2 style={{ width: '70%', height: '70%' }} />
							</ActionIcon>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item leftSection={<BringToFront size={14} />} onClick={() => setDragEnabled((prev) => !prev)}>
								{!dragEnabled && 'Изменить порядок задач'}
								{dragEnabled && 'Вернуть обычный вид'}
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Flex>
			</Flex>
			<Divider my='sm' variant='dashed' />
			<ScrollArea h='220px' scrollbars='y'>
				{dragEnabled && (
					<DndContext
						collisionDetection={closestCorners}
						onDragEnd={handleDragEnd}
						onDragStart={(event) => changeActive(event.active.id)}
						sensors={sensors}
					>
						<Flex gap={10} h='100%' direction='column'>
							{!(workspaceLoading || tasksLoading) && (
								<SortableContext items={tasks} strategy={verticalListSortingStrategy}>
									{tasks
										.filter((item) => item.status === 'Назначена')
										.map((item) => (
											<Flex key={item.id}>
												<SortableItem {...item} dragging={true} />
											</Flex>
										))}
									<DragOverlay>
										{tasks
											.filter((item) => item.status === 'Назначена')
											.filter((item) => item.id === activeTask)
											.map((item) => (
												<SortableItem key={item.id} {...item} dragging={true} />
											))}
									</DragOverlay>
								</SortableContext>
							)}
							{(workspaceLoading || tasksLoading) &&
								Array.from({ length: 3 }).map((_, index) => (
									<Flex key={index}>
										<Skeleton mih={70} radius='md' w='100%' />
									</Flex>
								))}
						</Flex>
					</DndContext>
				)}
				{!dragEnabled && (
					<Flex gap={10} h='100%' direction='column'>
						{!workspaceLoading &&
							!tasksLoading &&
							tasks
								.filter((item) => item.status === 'Назначена')
								.map((item) => <SortableItem key={item.id} {...item} dragging={false} />)}

						{(workspaceLoading || tasksLoading) &&
							Array.from({ length: 3 }).map((_, idx) => <Skeleton key={idx} mih={70} radius='md' w='100%' />)}
					</Flex>
				)}
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
