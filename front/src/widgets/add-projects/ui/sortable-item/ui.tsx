import { Plus } from 'lucide-react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ActionIcon, Avatar, Button, Flex, Text } from '@mantine/core'

import { ThemeColors } from '@shared/config'
import type { ProjectResponse } from '@shared/types'

export const SortableItem = ({ id, title, image_url, open }: ProjectResponse & { open?: () => void }) => {
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
				leftSection={<Avatar radius={10} size={40} src={image_url} />}
				opacity='60%'
			>
				<Flex align='start' justify='center' direction='column'>
					<Text fw={600}>{title}</Text>
					<Text c='gray' fz={12}>
						Задач нет
					</Text>
				</Flex>
			</Button>
		)
	}

	if (id === -1) {
		return (
			<Button
				justify='left'
				key={id}
				mih={70}
				radius='md'
				title={title}
				type='button'
				variant='default'
				w='100%'
				leftSection={
					<ActionIcon radius='xl' size='xl' variant='light' component='div'>
						<Plus size={18} />
					</ActionIcon>
				}
				onClick={open}
			>
				<Flex align='start' justify='center' direction='column'>
					<Text fw={600}>{id !== -1 ? title : 'Новый проект'}</Text>
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
			leftSection={<Avatar radius={10} size={40} src={image_url} />}
			onContextMenu={() => console.log('first')}
			{...attributes}
			{...listeners}
		>
			<Flex align='start' justify='center' direction='column'>
				<Text fw={600}>{title}</Text>
				<Text c='gray' fz={12}>
					Задач нет
				</Text>
			</Flex>
		</Button>
	)
}
