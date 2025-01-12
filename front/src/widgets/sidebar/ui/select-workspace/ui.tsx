import { useUnit } from 'effector-react'
import { ChartNoAxesGantt, CircleCheck, Plus } from 'lucide-react'

import { Avatar, Flex, Select, Text } from '@mantine/core'

import { ThemeColors } from '@shared/config'
import { $currentWorkspace, $workspaces, changedWorkspace } from '@shared/store'

export const SelectWorkspace = () => {
	const [workspaces, currentWorkspace, change] = useUnit([$workspaces, $currentWorkspace, changedWorkspace])

	const handleAddWorkspace = () => {
		alert('Введите название области')
	}

	return (
		<Select
			value={currentWorkspace.title}
			data={[
				...workspaces.map((workspace) => ({ value: workspace.title, label: workspace.title })),

				{
					group: 'Другое',
					items: [
						{ value: 'add', label: 'Добавить область' },
						{ value: 'change', label: 'Управлять областями' }
					]
				}
			]}
			styles={{
				input: {
					borderRadius: '10px'
				},
				dropdown: {
					borderRadius: '10px'
				}
			}}
			allowDeselect={false}
			checkIconPosition='right'
			comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
			leftSection={<Avatar radius={6} size={20} src={currentWorkspace.image_url} />}
			onChange={(current) => {
				if (current === 'add') {
					handleAddWorkspace()
				} else {
					change(current!)
				}
			}}
			renderOption={(item) => (
				<>
					{!(item.option.value === 'add' || item.option.value === 'change') && (
						<Flex align='center' gap={10}>
							<Avatar
								radius={6}
								size={28}
								src={workspaces.find((workspace) => workspace.title === item.option.value)?.image_url}
							/>
							<Text
								size='sm'
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '4px',
									overflow: 'hidden'
								}}
							>
								{item.option.label}
							</Text>
						</Flex>
					)}
					{(item.option.value === 'add' || item.option.value === 'change') && (
						<Flex align='center' justify='left' w='100%'>
							<Text
								// c='pink'
								fw={500}
								size='sm'
								style={{
									textAlign: 'center',
									display: 'flex',
									alignItems: 'center',
									gap: '4px'
								}}
							>
								{item.option.value === 'add' && <Plus size={18} />}
								{item.option.value === 'change' && <ChartNoAxesGantt size={18} />}
								{item.option.label}
							</Text>
						</Flex>
					)}
					{item.checked && <CircleCheck size={30} color='green' />}
				</>
			)}
		/>
	)
}
