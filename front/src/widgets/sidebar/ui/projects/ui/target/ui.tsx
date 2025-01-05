import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { Avatar, Menu, NavLink } from '@mantine/core'

import { routes } from '@shared/config'
import type { ProjectResponse } from '@shared/types'

import { activeProjected, setMenuPositioned } from '../../model'

export const Target = ({ item }: { item: ProjectResponse }) => {
	const [setActiveProject, setMenuPosition, openPath, currentPath] = useUnit([
		activeProjected,
		setMenuPositioned,
		routes.private.project.$isOpened,
		routes.private.project.$params
	])

	const handleContextMenu = (event: React.MouseEvent, activeProject: ProjectResponse) => {
		event.preventDefault()
		setActiveProject(activeProject)
		setMenuPosition({ x: event.clientX, y: event.clientY })
	}

	return (
		<Menu.Target>
			<NavLink
				active={item.id.toString() === currentPath.projectId && openPath}
				label={item.title}
				params={{ projectId: item.id.toString() }}
				style={{ borderRadius: '10px' }}
				variant='filled'
				component={Link}
				leftSection={<Avatar alt={item.title} radius='sm' size={25} src={item.image_url} />}
				onContextMenu={(event) => handleContextMenu(event, item)}
				to={routes.private.project as unknown as string}
			/>
		</Menu.Target>
	)
}
