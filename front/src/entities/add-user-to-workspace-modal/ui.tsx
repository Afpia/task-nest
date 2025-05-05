import { useState } from 'react'
import { useUnit } from 'effector-react'
import { CircleCheck } from 'lucide-react'

import { Button, Flex, Modal, Select, Text } from '@mantine/core'

import { role } from '@shared/config'
import { addedUserToWorkspace } from '@shared/store'
import type { UserFieldResponse, WorkspaceResponse } from '@shared/types'

export const ModalAddUserToWorkspace = ({
	opened,
	close,
	user,
	currentWorkspace,
	workspaces
}: {
	opened: boolean
	close: () => void
	user: UserFieldResponse
	currentWorkspace: WorkspaceResponse
	workspaces: WorkspaceResponse[]
}) => {
	const [addUserToWorkspace] = useUnit([addedUserToWorkspace])

	const [workspaceId, setWorkspaceId] = useState<string>(currentWorkspace?.id.toString())

	const addUserToWorkspaceClick = () => {
		close()
		setWorkspaceId(currentWorkspace?.id.toString())
		addUserToWorkspace({ user_id: user.id, workspaceId })
	}

	return (
		<Modal size='lg' title={`На какой workspace вы хотите добавить ${user.login}?`} centered onClose={close} opened={opened}>
			<Select
				mb={20}
				value={workspaceId}
				data={[
					...workspaces
						.filter((item) => item.pivot.role === role.OWNER || item.pivot.role === role.ADMIN)
						.map((workspace) => ({ value: workspace?.id.toString(), label: workspace.title }))
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
				onChange={(current) => setWorkspaceId(current!)}
				renderOption={(item) => (
					<>
						<Flex align='center' gap={10}>
							<Text
								size='sm'
								truncate='end'
								style={{
									display: 'flex',
									alignItems: 'center',
									width: '520px',
									gap: '4px'
								}}
							>
								{item.option.label}
							</Text>
						</Flex>

						{item.checked && <CircleCheck size={20} width={20} color='green' />}
					</>
				)}
			/>
			<Flex align='center' gap='20' justify='flex-end'>
				<Button variant='light' onClick={close}>
					Отмена
				</Button>
				<Button onClick={addUserToWorkspaceClick}>Добавить</Button>
			</Flex>
		</Modal>
	)
}
