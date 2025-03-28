import { Plus } from 'lucide-react'

import { ActionIcon, Box, Divider, Flex, Select, Title } from '@mantine/core'

import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'

export const People = () => {
	const { isDark } = isDarkMode()

	return (
		<Box
			bd={`1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}`}
			bg={isDark ? ThemeColors.dark : ThemeColors.light}
			h='300px'
			mih='100%'
			p={20}
			style={{ borderRadius: '20px' }}
			w='50%'
		>
			<Flex justify='space-between'>
				<Title fw={600} size={20} order={2}>
					Люди (0)
				</Title>
				<Flex gap={10}>
					<Select
						data={['По должности', 'По дате убывания', 'По дате возрастания']}
						defaultValue='По должности'
						allowDeselect={false}
					/>
					<ActionIcon aria-label='Plus' h='100%' variant='filled' w='35px'>
						<Plus style={{ width: '70%', height: '70%' }} />
					</ActionIcon>
				</Flex>
			</Flex>
			<Divider my='sm' variant='dashed' />
		</Box>
	)
}
