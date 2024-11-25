import { useUnit } from 'effector-react'
import { Lock, Mail, Plus } from 'lucide-react'

import { Box, Button, Divider, Flex, PasswordInput, Select, Text, Textarea, TextInput, Title } from '@mantine/core'
import type { UseFormReturnType } from '@mantine/form'
import { $user } from '@pages/profile/model'

export const Personal = ({
	form
}: {
	form: UseFormReturnType<
		{
			password: string
			newPassword: string
			email: string
			name: string
			surname: string
			avatar: string
		},
		// eslint-disable-next-line style/member-delimiter-style
		(values: { password: string; newPassword: string; email: string; name: string; surname: string; avatar: string }) => {
			password: string
			newPassword: string
			email: string
			name: string
			surname: string
			avatar: string
		}
	>
}) => {
	const [userInfo] = useUnit([$user])

	return (
		<>
			<Divider w='100%' mb={20} mt={20} />
			<Box>
				<Flex w='100%' direction='column'>
					<Title mb={10} order={3} size={14} fw={600}>
						Пароль
					</Title>
					<Text size='14px' mb={14}>
						Изменение текущего пароля
					</Text>
				</Flex>
				<Flex w='100%' align='start' h='100%' justify='start' gap={20}>
					<PasswordInput label='Текущий пароль' radius='md' w='48%' {...form.getInputProps('password')} leftSection={<Lock />} />
					<PasswordInput label='Новый пароль' radius='md' w='48%' {...form.getInputProps('newPassword')} leftSection={<Lock />} />
				</Flex>
			</Box>
			<Divider w='100%' mb={20} mt={20} />
		</>
	)
}
