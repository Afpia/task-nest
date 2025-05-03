/* eslint-disable simple-import-sort/imports */
import { useUnit } from 'effector-react'
import { Mail, MapPin } from 'lucide-react'

import 'dayjs/locale/ru'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { Avatar, Box, Container, Flex, Image, Skeleton, Text, Title } from '@mantine/core'

import { AvatarSrc } from '@shared/helpers'
import { $userLogin, getUserLoginFx } from '@shared/store'

dayjs.extend(utc)
dayjs.locale('ru')

export const Profile = () => {
	const [user, loadingUser] = useUnit([$userLogin, getUserLoginFx.$pending])

	return (
		<Flex align='center' gap='20' justify='center' w='100%' direction='column'>
			{loadingUser && <Skeleton h='500px' style={{ borderRadius: '10px' }} w={860} />}
			{!loadingUser && (
				<Container w={860}>
					<Box pos='relative'>
						<Image
							h={200}
							radius='md'
							src={user.background_url ?? 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png'}
						/>
						<Avatar left={30} size={150} src={AvatarSrc(user.avatar_url)} variant='filled' pos='absolute' top={80} />
					</Box>
					<Flex justify='space-between' mt={35}>
						<Flex direction='column'>
							<Flex mb={10} direction='column'>
								<Title size={30} order={1}>
									{user.name}
								</Title>
								<Text lh={2} m={0} size='sm'>
									{/* eslint-disable-next-line style/jsx-one-expression-per-line */}
									Дата создания: {dayjs.utc(user.created_at).format('DD.MM.YYYY')}
								</Text>
							</Flex>
							<Flex gap='10' direction='column'>
								<Flex align='center' gap='10'>
									<MapPin />
									<Text>{user.city ?? 'Город не указан'}</Text>
								</Flex>
								<Flex align='center' gap='10'>
									<Mail />
									<Text>{user.email}</Text>
								</Flex>
							</Flex>
						</Flex>
						<Flex w={260} direction='column'>
							<Title size={24} order={2}>
								О себе
							</Title>
							<Text lh={2} m={0} size='sm'>
								{user.about ?? 'Пользователь ничего не написал о себе'}
							</Text>
						</Flex>
					</Flex>
				</Container>
			)}
		</Flex>
	)
}
