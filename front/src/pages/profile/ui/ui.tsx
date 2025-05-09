/* eslint-disable simple-import-sort/imports */
import { useUnit } from 'effector-react'
import { Check, Mail, MapPin, Pencil, X } from 'lucide-react'

import 'dayjs/locale/ru'

import { useState } from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { Avatar, Box, Button, Container, FileButton, Flex, Image, Skeleton, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ModalAddUserToWorkspace } from '@entities/add-user-to-workspace-modal'
import { ROLE } from '@shared/config'
import { SrcImage } from '@shared/helpers'
import {
	$currentWorkspace,
	$user,
	$userLogin,
	$workspaceRole,
	$workspaces,
	getUserLoginFx,
	getUserWorkspacesFx,
	getWorkspaceRoleFx,
	patchedUserBackground
} from '@shared/store'

dayjs.extend(utc)
dayjs.locale('ru')

export const Profile = () => {
	const [user, loadingUser, myRole, loadingWorkspace, loadingRole, myUser, currentWorkspace, workspaces, updateBackground] =
		useUnit([
			$userLogin,
			getUserLoginFx.$pending,
			$workspaceRole,
			getUserWorkspacesFx.$pending,
			getWorkspaceRoleFx.$pending,
			$user,
			$currentWorkspace,
			$workspaces,
			patchedUserBackground
		])
	const [opened, { open, close }] = useDisclosure(false)

	const [file, setFile] = useState<File | null>(null)

	const clearFile = () => {
		setFile(null)
	}

	const changeBackground = () => {
		const formData = new FormData()
		if (file) formData.append('background_url', file)

		setFile(null)
		updateBackground(formData)
	}

	return (
		<Flex align='center' gap='20' justify='center' w='100%' direction='column'>
			{(loadingUser || loadingRole || loadingWorkspace) && <Skeleton h='500px' style={{ borderRadius: '10px' }} w={860} />}
			{!(loadingUser || loadingRole || loadingWorkspace) && (
				<>
					<Container w={860}>
						<Box pos='relative'>
							<Image
								h={200}
								radius='md'
								src={
									(file && URL.createObjectURL(file)) ??
									SrcImage(user.background_url) ??
									'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png'
								}
							/>
							{file && (
								<Button right={50} size='compact-md' variant='default' onClick={clearFile} pos='absolute' top={10}>
									<X size={16} />
								</Button>
							)}
							{file && (
								<Button right={10} size='compact-md' variant='default' onClick={changeBackground} pos='absolute' top={10}>
									<Check size={16} />
								</Button>
							)}
							{!file && myUser.login === user.login && (
								<FileButton accept='image/png,image/jpeg' onChange={setFile}>
									{(props) => (
										<Button right={10} size='compact-md' variant='gradient' pos='absolute' top={10} {...props}>
											<Pencil size={16} />
										</Button>
									)}
								</FileButton>
							)}
							<Avatar left={30} size={150} src={SrcImage(user.avatar_url)} variant='filled' pos='absolute' top={80} />
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
								<Flex gap='10' mb={20} direction='column'>
									<Flex align='center' gap='10'>
										<MapPin />
										<Text>{user.city ?? 'Город не указан'}</Text>
									</Flex>
									<Flex align='center' gap='10'>
										<Mail />
										<Text>{user.email}</Text>
									</Flex>
								</Flex>
								{myUser.login !== user.login && (myRole.role === ROLE.OWNER || myRole.role === ROLE.ADMIN) && (
									<Button onClick={() => open()}>Добавить на workspace</Button>
								)}
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
					<ModalAddUserToWorkspace
						user={user}
						close={close}
						currentWorkspace={currentWorkspace}
						opened={opened}
						workspaces={workspaces}
					/>
				</>
			)}
		</Flex>
	)
}
