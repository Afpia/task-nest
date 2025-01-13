import { CirclePlus } from 'lucide-react'

import { Flex, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ModalCreateProject } from '@entities/create-project-modal'

export const CreateProject = () => {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<Flex align='center' justify='space-between' mb={18}>
			<Title c='#868E96' size={12} ta='left' tt='uppercase' order={2}>
				Проекты
			</Title>
			<CirclePlus size='16' cursor='pointer' onClick={open} />
			<ModalCreateProject close={close} opened={opened} />
		</Flex>
	)
}
