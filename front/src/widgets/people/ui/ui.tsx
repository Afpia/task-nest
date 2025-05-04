import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { Plus } from 'lucide-react'

import { ActionIcon, Avatar, Box, Divider, Flex, Grid, Image, Select, Skeleton, Text, Title } from '@mantine/core'

import people_not_found from '@app/assets/svg/people-not-found.svg'
import { routes, ThemeColors } from '@shared/config'
import { AvatarSrc, isDarkMode } from '@shared/helpers'
import { $user } from '@shared/store'

import { $usersWorkspace, getUsersWorkspaceFx } from '../model'

const role_naming = {
	owner: 'Владелец',
	admin: 'Админ',
	executor: 'Исполнитель',
	project_manager: 'Проектный менеджер'
}

export const People = () => {
	const { isDark } = isDarkMode()
	const [users, user, usersLoading] = useUnit([$usersWorkspace, $user, getUsersWorkspaceFx.$pending])

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
				{usersLoading && <Skeleton h={36} w={100} />}
				{!usersLoading && (
					<Title fw={600} size={20} order={2}>
						{/* eslint-disable-next-line style/jsx-one-expression-per-line */}
						Люди ({(users.length ?? 1) - 1})
					</Title>
				)}
				<Flex gap={10}>
					<Select
						data={['По должности возрастания', 'По должности убывания']}
						defaultValue='По должности убывания'
						allowDeselect={false}
					/>
					<Link to={routes.private.search}>
						<ActionIcon aria-label='Plus' h='100%' variant='filled' w='35px'>
							<Plus style={{ width: '70%', height: '70%' }} />
						</ActionIcon>
					</Link>
				</Flex>
			</Flex>
			<Divider my='sm' variant='dashed' />
			{usersLoading && <Skeleton h={195} />}
			{!usersLoading && users.length === 1 && (
				<Flex align='center' justify='center'>
					<Image h={195} src={people_not_found} w={210} />
				</Flex>
			)}
			{!usersLoading && users.length >= 2 && (
				<Grid h='100%' styles={{ inner: { maxWidth: '100%', margin: '0 auto' } }}>
					{users
						.filter((item) => item.id !== user.id)
						.map((item) => (
							<Grid.Col key={item.id} p={5} span={4}>
								<Flex
									align='center'
									bd={`1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}`}
									key={item.id}
									p={10}
									style={{ borderRadius: '20px' }}
									direction='column'
								>
									<Avatar mb={10} radius='100%' size='85' src={AvatarSrc(item.avatar_url)} variant='default' />
									<Title size={18}>{item.name}</Title>
									<Text>{role_naming[item.pivot.role]}</Text>
								</Flex>
							</Grid.Col>
						))}
				</Grid>
			)}
		</Box>
	)
}
