import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import { Avatar, Menu, NavLink } from '@mantine/core'

import { routes } from '@shared/config'
import { ProjectResponse } from '@shared/types'

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
				component={Link}
				to={routes.private.project as unknown as string}
				params={{ projectId: item.id.toString() }}
				onContextMenu={(event) => handleContextMenu(event, item)}
				label={item.title}
				variant='filled'
				leftSection={<Avatar size={25} radius='sm' src={item.image_url} alt={item.title} />}
				style={{ borderRadius: '10px' }}
				active={item.id.toString() === currentPath.projectId && openPath}
			/>
		</Menu.Target>
	)
}
