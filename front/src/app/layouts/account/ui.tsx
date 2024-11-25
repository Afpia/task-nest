import { Link } from 'atomic-router-react'

import { Container, Flex, NavLink } from '@mantine/core'
import { routes } from '@shared/config'
import type { Children } from '@shared/types'

export const AccountLayout = ({ children }: Children) => {
	return (
		<Container>
			<Flex direction='column' w='200'>
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
			{children}
		</Container>
	)
}
