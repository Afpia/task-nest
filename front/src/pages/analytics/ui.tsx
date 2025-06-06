import { useMemo } from 'react'
import { useUnit } from 'effector-react'

import { BarChart, type ChartTooltipProps } from '@mantine/charts'
import { Box, Divider, Flex, Paper, Text, Title } from '@mantine/core'

import { ROLE } from '@shared/config'
import { $usersWorkspace } from '@widgets/people/model'

export const Analytics = () => {
	const [users] = useUnit([$usersWorkspace])

	// const chartData = users
	// 	.filter((user) => user.pivot?.role === ROLE.EXECUTOR && Array.isArray(user.tasks))
	// 	.map((user) => ({
	// 		name: user.name,
	// 		tasks: user.tasks.length
	// 	}))
	const executors = users.filter((u) => u.pivot?.role === ROLE.EXECUTOR && Array.isArray(u.tasks))

	// const chartData = users
	// 	.filter((user) => user.pivot?.role === ROLE.EXECUTOR && Array.isArray(user.tasks))
	// 	.map((user) => ({
	// 		name: user.name,
	// 		taskCount: user.tasks.length,
	// 		taskTitles: user.tasks.map((task) => task.title)
	// 	}))

	const allTaskTitles = useMemo(() => {
		const set = new Set<string>()
		executors.forEach((u) => u.tasks.forEach((t) => set.add(t.title)))
		return Array.from(set)
	}, [executors])

	const chartData = executors.map((u) => {
		const obj: Record<string, any> = { name: u.name }
		allTaskTitles.forEach((title) => {
			obj[title] = u.tasks.some((t) => t.title === title) ? 1 : 0
		})
		return obj
	})

	const series = allTaskTitles.map((title, idx) => ({
		name: title,
		dataKey: title,
		color: ['indigo.6', 'blue.6', 'teal.6', 'orange.6', 'pink.6', 'grape.6', 'lime.6', 'cyan.6'][idx % 8]
	}))

	const ChartTooltip = ({ label, payload }: ChartTooltipProps) => {
		if (!payload || !payload[0]) return null

		return (
			<Paper px='md' py='sm' radius='md' shadow='md' withBorder>
				<Text fw={500} mb={5}>
					{label}
				</Text>
				<Divider my='xs' />
				<Text fz='sm' mb={5}>
					Задачи:
				</Text>
				{/* {taskTitles?.map((item) => (
					<Text fz='sm' key={item}>
						{item}
					</Text>
				))} */}
				{payload.map((entry, idx) => {
					const { name: taskName, value, color } = entry
					if (value === 0) return null
					return (
						<Flex align='center' gap={4} key={idx}>
							<Box bg={color as string} h={12} style={{ borderRadius: 2 }} w={12} />
							<Text size='sm'>{taskName}</Text>
						</Flex>
					)
				})}
			</Paper>
		)
	}

	return (
		<>
			<Title mb={30} order={3}>
				Загруженность исполнителей
			</Title>
			<BarChart
				data={chartData}
				dataKey='name'
				h={500}
				series={series}
				tickLine='y'
				type='stacked'
				withLegend
				tooltipAnimationDuration={200}
				tooltipProps={{
					content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />
				}}
			/>
		</>
	)
}
