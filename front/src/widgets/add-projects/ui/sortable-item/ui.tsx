/* eslint-disable style/member-delimiter-style */
/* eslint-disable style/multiline-ternary */
import { Plus } from 'lucide-react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ActionIcon, Avatar, Button, Flex, Text } from '@mantine/core'

import type { ProjectResponse } from '@shared/types'

export const SortableItem = ({ id, title, image_url, open }: ProjectResponse & { open?: () => void }) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}
	if (isDragging) {
		return (
			<Button p={10} variant='default' opacity='60%' mih={60} w='100%' radius='md' type='button' ref={setNodeRef} style={style} />
		)
	}

	if (id === -1) {
		return (
			<Button
				type='button'
				key={id}
				mih={60}
				w='100%'
				radius='md'
				leftSection={
					<ActionIcon
						component='div'
						variant='light'
						radius='xl'
						size='lg'
						style={{
							border: '1px dashed #cccccc',
							backgroundColor: '#f7f7f7'
						}}
					>
						<Plus size={18} color='#cccccc' />
					</ActionIcon>
				}
				onClick={open}
				variant='default'
				justify='left'
				title={title}
			>
				<Flex direction='column' justify='center' align='start'>
					<Text fw={600}>{id !== -1 ? title : 'Новый проект'}</Text>
				</Flex>
			</Button>
		)
	}

	return (
		<Button
			type='button'
			key={id}
			mih={60}
			w='100%'
			radius='md'
			leftSection={<Avatar size={40} src={image_url} radius={10} />}
			variant='default'
			justify='left'
			ref={setNodeRef}
			style={style}
			title={title}
			{...attributes}
			{...listeners}
		>
			<Flex direction='column' justify='center' align='start'>
				<Text fw={600}>{title}</Text>
				<Text c='gray' fz={12}>
					Задач нет
				</Text>
			</Flex>
		</Button>
	)
}
