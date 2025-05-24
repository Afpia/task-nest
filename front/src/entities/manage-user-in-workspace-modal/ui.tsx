import { useState } from 'react'
import { useUnit } from 'effector-react'

import { Button, Flex, Modal, Select, Text } from '@mantine/core'

import { managedUserInWorkspace } from '@shared/store'

const roleOptions = [
	{ value: 'admin', label: 'Админ' },
	{ value: 'executor', label: 'Исполнитель' },
	{ value: 'project_manager', label: 'Проектный менеджер' }
]

export const ManageUserInWorkspaceModal = ({
	opened,
	close,
	roleUser,
	userId
}: {
	opened: boolean
	close: () => void
	roleUser: 'admin' | 'executor' | 'project_manager'
	userId: number
}) => {
	const [selectedRole, setSelectedRole] = useState<'admin' | 'executor' | 'project_manager'>(roleUser)
	const [manageUser] = useUnit([managedUserInWorkspace])

	const manageUserClick = () => {
		close()
		manageUser({ role: selectedRole, user_id: userId })
	}

	return (
		<Modal title='Изменить роль пользователю' centered onClose={close} opened={opened}>
			<Text mb={10} size='sm'>
				Выберите новую роль для пользователя:
			</Text>
			<Select
				data={roleOptions}
				defaultValue={roleUser}
				mb='md'
				value={selectedRole}
				allowDeselect={false}
				onChange={(val) => {
					setSelectedRole(val! as 'admin' | 'executor' | 'project_manager')
				}}
				placeholder='Выберите роль'
			/>

			<Flex align='center' gap='20' justify='flex-end'>
				<Button variant='light' onClick={close}>
					Отмена
				</Button>
				<Button onClick={manageUserClick}>Изменить</Button>
			</Flex>
		</Modal>
	)
}
