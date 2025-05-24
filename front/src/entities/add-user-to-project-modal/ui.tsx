import { useState } from 'react'
import { useUnit } from 'effector-react'
import { CircleCheck } from 'lucide-react'

import { Avatar, Button, Flex, Modal, Select, Text } from '@mantine/core'

import { ROLE } from '@shared/config'
import { SrcImage } from '@shared/helpers'
import { $usersProject, assignedUserToProject } from '@shared/store'
import { $usersWorkspace } from '@widgets/people/model'

// interface UserSelectItem {
// 	checked?: boolean
// 	disabled?: boolean
// 	option: {
// 		value: string
// 		label: string
// 		avatar: string
// 	}
// }

export const ModalAddUserToProject = ({ opened, close }: { opened: boolean; close: () => void }) => {
	const [assignUserToProject, users, usersProject] = useUnit([assignedUserToProject, $usersWorkspace, $usersProject])

	const [userId, setUserId] = useState<number | null>(null)

	const addUserToProjectClick = () => {
		close()
		if (userId) assignUserToProject(userId)
		setUserId(null)
	}

	const available = users.filter(
		(item) =>
			(item.pivot.role === ROLE.EXECUTOR || item.pivot.role === ROLE.PROJECT_MANAGER) &&
			!usersProject.some((u) => u.id === item.id)
	)

	return (
		<Modal size='lg' title='Кого вы хотите добавить на проект?' centered onClose={close} opened={opened}>
			<Select
				mb={20}
				value={userId?.toString()}
				data={available.map((user) => ({
					value: user?.id.toString(),
					label: user.email,
					avatar: user.avatar_url
				}))}
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
				nothingFoundMessage='Пользователи не найдены'
				onChange={(current) => setUserId(Number(current!))}
				placeholder='Выберите пользователя'
				// FIXME: Сделать типизацию
				renderOption={(item: any) => (
					<>
						<Flex align='center' gap={10} maw={400}>
							<Avatar mah={28} maw={28} miw={28} radius='sm' src={SrcImage(item.option?.avatar)} w={28} />
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
				<Button onClick={addUserToProjectClick}>Добавить</Button>
			</Flex>
		</Modal>
	)
}
