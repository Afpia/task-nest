import { useUnit } from 'effector-react'
import { Lock } from 'lucide-react'
import dayjs from 'dayjs'

import { AreaChart } from '@mantine/charts'
import { Box, Divider, Flex, Title } from '@mantine/core'

import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'
import { $projectsStats } from '@shared/store'

export const ProjectsStats = () => {
	const [projectsStats] = useUnit([$projectsStats])
	const { isDark } = isDarkMode()

	const formattedStats = projectsStats.map((item) => ({
		...item,
		date: dayjs(item.date).format('DD MMM')
	}))

	return (
		<Box
			bd={`1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}`}
			h='300px'
			mih='100%'
			p={20}
			style={{ borderRadius: '20px' }}
			w='50%'
		>
			<Flex justify='space-between'>
				<Title fw={600} size={20} order={2}>
					График проектов
				</Title>
				<Lock />
			</Flex>
			<Divider my='sm' variant='dashed' />
			<AreaChart
				data={formattedStats}
				dataKey='date'
				h={200}
				type='default'
				withLegend
				series={[
					{ name: 'Созданные', color: 'indigo.6' },
					{ name: 'В процессе', color: 'blue.6' },
					{ name: 'Завершенные', color: 'teal.6' }
				]}
				tooltipAnimationDuration={200}
			/>
		</Box>
	)
}
