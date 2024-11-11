import { useUnit } from 'effector-react'
import { CirclePlus } from 'lucide-react'

import { Flex, Title, useMantineTheme } from '@mantine/core'
import { modals } from '@mantine/modals'
import { createdProjects } from '@widgets/sidebar/model'

export const CreateProject = () => {
	const [createProject] = useUnit([createdProjects])
	const theme = useMantineTheme()

	const openModal = () =>
		modals.openConfirmModal({
			title: 'Вы уверены что хотите создать новый проект?',
			centered: true,
			labels: { confirm: 'Да', cancel: 'Нет' },
			onConfirm: () => createProject()
		})

	return (
		<Flex align='center' justify='space-between' mb={18}>
			<Title c={theme.colors.gray[6]} order={2} size={12} ta='left' tt='uppercase'>
				Проекты
			</Title>
			<CirclePlus size='16' onClick={openModal} />
		</Flex>
	)
}
