import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { Mail, MapPin } from 'lucide-react'

import { Avatar, Box, Container, Flex, Image, Text, Title } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import { $avatar } from '@shared/store'

export const Profile = () => {
	const [avatar] = useUnit([$avatar])

	return (
		<Flex direction='column' gap='20' w='100%' align='center' justify='center'>
			<Container w={860}>
				<Box pos='relative'>
					<Image radius='md' h={200} src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png' />
					<Avatar size={150} src={avatar} variant='filled' pos='absolute' top={80} left={30} />
				</Box>
				<Flex mt={35} justify='space-between'>
					<Flex direction='column'>
						<Flex direction='column' mb={10}>
							<Title order={1} size={30}>
								Никита Галкин
							</Title>
							<Text>he/him</Text>
						</Flex>
						<Flex direction='column' gap='10'>
							<Flex gap='10' align='center'>
								<MapPin />
								<Text>Санкт-Петербург</Text>
							</Flex>
							<Flex gap='10' align='center'>
								<Mail />
								<Text>nikito1@gmail.com</Text>
							</Flex>
						</Flex>
					</Flex>
					<Title order={2} size={24}>
						О себе
					</Title>
				</Flex>
			</Container>
		</Flex>
	)
}
