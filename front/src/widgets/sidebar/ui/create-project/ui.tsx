import { CirclePlus } from 'lucide-react'

import { Flex, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ModalCreateProject } from '@entities/modal.create.project'

export const CreateProject = () => {
	const [opened, { open, close }] = useDisclosure(false)

	return (
		<Flex align='center' justify='space-between' mb={18}>
			<Title c='#868E96' order={2} size={12} ta='left' tt='uppercase'>
				Проекты
			</Title>
			<CirclePlus cursor='pointer' size='16' onClick={open} />
			<ModalCreateProject opened={opened} close={close} />
		</Flex>
	)
}
