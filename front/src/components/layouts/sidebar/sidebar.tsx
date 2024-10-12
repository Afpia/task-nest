import { Badge, NavLink } from '@mantine/core'

export const Sidebar = () => {
	return (
		<NavLink
			label='With description'
			description='Additional information'
			leftSection={
				<Badge size='xs' color='red' circle>
					3
				</Badge>
			}
		/>
	)
}
