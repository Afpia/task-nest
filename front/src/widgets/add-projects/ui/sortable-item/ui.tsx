import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Avatar, Button } from '@mantine/core'

import { ProjectResponse } from '@shared/types'

export const SortableItem = ({ id, title, image_url }: ProjectResponse) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}
	return (
		<Button
			type='button'
			key={id}
			mih={60}
			radius='md'
			p={10}
			w='50%'
			leftSection={<Avatar size={40} src={image_url} radius={10} />}
			variant='default'
			justify='left'
			ref={setNodeRef}
			style={style}
			title={title}
			{...attributes}
			{...listeners}
		>
			{title}
		</Button>
	)
}
