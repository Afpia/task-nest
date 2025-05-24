import { Grip } from 'lucide-react'
import dayjs from 'dayjs'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button, Flex, Text } from '@mantine/core'

import { statusColor } from '@shared/helpers'
import type { TaskResponse } from '@shared/types'

export const SortableItem = ({ id, title, end_date, dragging }: TaskResponse & { dragging: boolean }) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id,
		transition: {
			duration: 250,
			easing: 'ease-in-out'
		}
	})
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		'--button-hover': 'none'
	}

	const now = dayjs().startOf('day')
	const deadline = dayjs(end_date).startOf('day')
	const daysLeft = deadline.diff(now, 'day')
	const isOverdue = dayjs().startOf('day').isAfter(deadline)

	const deadlineText =
		daysLeft < 0
			? `Просрочено ${Math.abs(daysLeft)} дн.`
			: daysLeft === 0
				? 'Срок — сегодня'
				: daysLeft === 1
					? 'Остался 1 день'
					: `${daysLeft} дн. осталось`

	if (isDragging) {
		return (
			<Button
				justify='left'
				mih={70}
				radius='md'
				ref={setNodeRef}
				style={style}
				type='button'
				variant='default'
				w='100%'
				leftSection={<Grip size={18} />}
				opacity='60%'
			>
				<Flex align='start' justify='center' direction='column'>
					<Text fw={600}>{title}</Text>
					<Flex gap={30}>
						<Text c={statusColor(daysLeft, isOverdue)} fw={600} fz={14}>
							{deadlineText}
						</Text>
					</Flex>
				</Flex>
			</Button>
		)
	}

	return (
		<Button
			justify='left'
			key={id}
			mih={70}
			radius='md'
			ref={setNodeRef}
			style={style}
			title={title}
			type='button'
			variant='default'
			w='100%'
			leftSection={dragging && <Grip size={18} />}
			{...attributes}
			{...listeners}
		>
			<Flex align='start' justify='center' direction='column'>
				<Text fw={600}>{title}</Text>
				<Flex gap={30}>
					<Text c={statusColor(daysLeft, isOverdue)} fw={600} fz={14}>
						{deadlineText}
					</Text>
				</Flex>
			</Flex>
		</Button>
	)
}
