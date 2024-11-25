import { useEffect } from 'react'
import { useUnit } from 'effector-react'

import { Container, Flex, Image } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import { AvatarChange } from '../../account/ui/personal/avatar'
import { $avatar, $user, getUserInfoFx, ProfileScheme } from '../model'

export const Profile = () => {
	return (
		<Flex direction='column' gap='20' w='100%' align='center' justify='center'>
			<Container w={860}>
				<Image radius='md' h={200} src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png' />
			</Container>
		</Flex>
	)
}
