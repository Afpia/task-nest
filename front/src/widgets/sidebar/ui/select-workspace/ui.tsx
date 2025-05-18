import { useUnit } from 'effector-react'
import { ChartNoAxesGantt, CircleCheck, Plus } from 'lucide-react'

import { Avatar, Flex, Select, Skeleton, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ModalCreateWorkspace } from '@entities/create-workspace-modal'
import { SrcImage } from '@shared/helpers'
import { $currentWorkspace, $workspaces, changedWorkspace, getUserWorkspacesFx } from '@shared/store'

export const SelectWorkspace = () => {
	const [workspaces, currentWorkspace, change, loadingWorkspace] = useUnit([
		$workspaces,
		$currentWorkspace,
		changedWorkspace,
		getUserWorkspacesFx.$pending
	])
	const [opened, { open, close }] = useDisclosure(false)

	if (loadingWorkspace) return <Skeleton h={36} radius='md' w={210} />

	return (
		<>
			<Select
				value={currentWorkspace.id.toString()}
				data={[
					...workspaces.map((workspace) => ({ value: workspace.id.toString(), label: workspace.title })),

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
				leftSection={<Avatar radius={6} size={20} src={SrcImage(currentWorkspace.image_url)} />}
				onChange={(current) => {
					if (current === 'add') {
						open()
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
									src={SrcImage(workspaces.find((workspace) => workspace.id.toString() === item.option.value)?.image_url)}
								/>
								<Text
									size='sm'
									truncate='end'
									style={{
										display: 'flex',
										alignItems: 'center',
										width: '114px',
										gap: '4px'
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
						{item.checked && <CircleCheck size={20} width={20} color='green' />}
					</>
				)}
			/>
			<ModalCreateWorkspace close={close} opened={opened} />
		</>
	)
}
