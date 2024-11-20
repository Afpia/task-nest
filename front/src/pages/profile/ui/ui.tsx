import { useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import { Lock, Mail, Plus } from 'lucide-react'

import {
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	FileButton,
	Flex,
	Group,
	Image,
	Input,
	PasswordInput,
	Text,
	TextInput,
	Title
} from '@mantine/core'
import { useForm } from '@mantine/form'

import { AvatarChange } from './avatar'
import { Personal } from './personal'
import { Security } from './security'

import styles from './ui.module.css'

export const Profile = () => {
	const form = useForm({
		mode: 'controlled',
		initialValues: { password: '', email: '' }
		// validate: zodResolver(LoginScheme)
	})

	const onClickForm = (values) => {
		// loginError(form)
		// login({ data: values })
		console.log('update profile')
	}

	return (
		<Flex direction='column' gap='20' w='100%' align='center' justify='center'>
			<Container w={650}>
				<form onSubmit={form.onSubmit((values) => onClickForm(values))}>
					<AvatarChange />
					<Personal />
					<Security />
				</form>
			</Container>
		</Flex>
	)
}
