import { useUnit } from 'effector-react'
import { Mail, MapPin } from 'lucide-react'

import { Avatar, Box, Container, Flex, Image, Text, Title } from '@mantine/core'

import { $username } from '@shared/auth'
import { AvatarSrc } from '@shared/helpers'
import { $user, getUserFx } from '@shared/store'

export const Profile = () => {
	const [user, username] = useUnit([$user, $username, getUserFx.$pending])

	return (
		<Flex align='center' gap='20' justify='center' w='100%' direction='column'>
			<Container w={860}>
				<Box pos='relative'>
					<Image h={200} radius='md' src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png' />
					<Avatar left={30} size={150} src={AvatarSrc(user.avatar_url)} variant='filled' pos='absolute' top={80} />
				</Box>
				<Flex justify='space-between' mt={35}>
					<Flex direction='column'>
						<Flex mb={10} direction='column'>
							<Title size={30} order={1}>
								{username}
							</Title>
						</Flex>
						<Flex gap='10' direction='column'>
							<Flex align='center' gap='10'>
								<MapPin />
								<Text>Санкт-Петербург</Text>
							</Flex>
							<Flex align='center' gap='10'>
								<Mail />
								<Text>{user.email}</Text>
							</Flex>
						</Flex>
					</Flex>
					<Title size={24} order={2}>
						О себе
					</Title>
				</Flex>
			</Container>
		</Flex>
	)
}
