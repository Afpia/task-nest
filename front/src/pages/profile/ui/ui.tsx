import { useEffect } from 'react'
import { useUnit } from 'effector-react'

import { Container, Flex } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'

import { $avatar, $user, getUserInfoFx, ProfileScheme } from '../model'

import { AvatarChange } from './avatar'
import { Personal } from './personal'
import { Security } from './security'

import styles from './ui.module.css'

export const Profile = () => {
	const [user, avatar, loading] = useUnit([$user, $avatar, getUserInfoFx.pending])

	const form = useForm({
		mode: 'controlled',
		initialValues: { password: '', newPassword: '', email: '', name: '', surname: '', avatar: '' },
		validate: zodResolver(ProfileScheme)
	})

	useEffect(() => {
		if (!loading && user) {
			const surname = user?.name?.split(' ')[1]
			const name = user?.name?.split(' ')[0]
			form.setValues({
				email: user.email,
				name,
				surname,
				avatar,
				password: '',
				newPassword: ''
			})
		}
	}, [user, avatar])

	const onClickForm = (values) => {
		// loginError(form)
		// login({ data: values })
		console.log('update profile')
	}

	return (
		<Flex direction='column' gap='20' w='100%' align='center' justify='center'>
			<Container w={650}>
				{loading && <div>Loading...</div>}
				{!loading && (
					<form onSubmit={form.onSubmit((values) => onClickForm(values))}>
						<AvatarChange form={form} />
						<Personal form={form} />
						<Security />
					</form>
				)}
			</Container>
		</Flex>
	)
}
