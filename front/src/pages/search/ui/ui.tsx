import { useEffect, useState } from 'react'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { SearchIcon } from 'lucide-react'

import { Accordion, Avatar, Container, Flex, Group, Input, Text } from '@mantine/core'

import { routes } from '@shared/config'
import { AvatarSrc } from '@shared/helpers'
import { useDebounce } from '@shared/hooks'
import { $userSearch, queriedUser } from '@shared/store'
import type { UserFieldResponse } from '@shared/types'

const AccordionLabel = ({ avatar_url, name, email, login }: UserFieldResponse) => (
	<Group wrap='nowrap'>
		<Link params={{ userLogin: login }} to={routes.private.profile}>
			<Avatar radius='xl' size='lg' src={AvatarSrc(avatar_url)} />
		</Link>
		<div>
			<Link params={{ userLogin: login }} to={routes.private.profile}>
				<Text>{name}</Text>
			</Link>
			<Text c='dimmed' fw={400} size='sm'>
				{email}
			</Text>
		</div>
	</Group>
)

export const Search = () => {
	const [queryUser, users] = useUnit([queriedUser, $userSearch])
	const [email, setEmail] = useState('')

	const debouncedEmail = useDebounce(email, 500)

	useEffect(() => {
		queryUser(debouncedEmail)
	}, [debouncedEmail])

	const items = users?.map((item) => (
		<Accordion.Item key={item.email} value={String(item.id)}>
			<Accordion.Control chevron={!item.about}>
				<AccordionLabel {...item} />
			</Accordion.Control>
			{item.about && (
				<Accordion.Panel>
					<Text size='sm'>{item.about}</Text>
				</Accordion.Panel>
			)}
		</Accordion.Item>
	))

	return (
		<Container w={860}>
			<Flex align='center' gap={20} justify='center' direction='column'>
				<Input
					miw={600}
					radius='md'
					size='lg'
					value={email}
					variant='filled'
					leftSection={<SearchIcon size={20} />}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Поиск по почте'
				/>
				<Accordion miw={600} variant='contained' chevronPosition='right'>
					{items}
				</Accordion>
			</Flex>
		</Container>
	)
}
