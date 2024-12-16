import { useUnit } from 'effector-react'

import { Avatar, Select } from '@mantine/core'

import { $currentWorkspace, $workspaces, changedWorkspace } from '@shared/store'

export const SelectWorkspace = () => {
	const [workspaces, currentWorkspace, change] = useUnit([$workspaces, $currentWorkspace, changedWorkspace])

	return (
		<Select
			value={currentWorkspace.title}
			onChange={(current) => change(current!)}
			allowDeselect={false}
			data={workspaces.map((workspace) => ({ value: workspace.title, label: workspace.title }))}
			comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
			leftSection={<Avatar size={20} src={currentWorkspace.image_url} />}
			styles={{
				input: {
					borderRadius: '10px'
				}
			}}
		/>
	)
}
