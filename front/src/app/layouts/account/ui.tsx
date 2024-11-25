import { Link } from 'atomic-router-react'

import { Avatar, Box, Button, Container, Flex, NavLink } from '@mantine/core'
import { routes } from '@shared/config'
import type { Children } from '@shared/types'

export const AccountLayout = ({ children }: Children) => (
	<Container w={860}>
		<Flex justify='space-between' align='center' mb={20}>
			<Avatar size={60} />
			<Button component={Link} variant='light' to={routes.private.profile}>
				Перейти в профиль
			</Button>
		</Flex>
		<Flex>
			<Flex direction='column' miw='210'>
				<NavLink
					component={Link}
					to={routes.private.account}
					label='Общие'
					active={routes.private.account.$isOpened.getState()}
				/>
				<NavLink
					component={Link}
					label='Персональные'
					active={routes.private.account_personal.$isOpened.getState()}
					to={routes.private.account_personal}
				/>
			</Flex>
			<Box w='100%' ml={20}>
				{children}
			</Box>
		</Flex>
	</Container>
)
