import { useEffect, useState } from 'react'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { SearchIcon } from 'lucide-react'

import { Accordion, Avatar, Container, Flex, Group, Image, Input, Text } from '@mantine/core'

import search_not_found from '@app/assets/svg/search-not-found.svg'
import search_people from '@app/assets/svg/search-people.svg'
import { routes } from '@shared/config'
import { SrcImage } from '@shared/helpers'
import { useDebounce } from '@shared/hooks'
import { $userSearch, clearedUserSearch, queriedUser } from '@shared/store'
import type { UserFieldResponse } from '@shared/types'

const AccordionLabel = ({ avatar_url, name, login }: UserFieldResponse) => (
	<Group wrap='nowrap'>
		<Flex p={2}>
			<Link params={{ userLogin: login }} to={routes.private.profile}>
				<Avatar radius='xl' size='lg' src={SrcImage(avatar_url)} />
			</Link>
		</Flex>
		<div>
			<Link params={{ userLogin: login }} to={routes.private.profile}>
				<Text>{name}</Text>
			</Link>
			<Text c='dimmed' fw={400} size='sm'>
				{login}
			</Text>
		</div>
	</Group>
)

export const Search = () => {
	const [queryUser, users, clearUserSearch] = useUnit([queriedUser, $userSearch, clearedUserSearch])
	const [login, setLogin] = useState('')

	const debouncedLogin = useDebounce(login, 500)

	useEffect(() => {
		if (!debouncedLogin) return clearUserSearch()
		queryUser(debouncedLogin)
	}, [debouncedLogin])

	const items = users?.map((item) => (
		<Accordion.Item key={item.login} value={String(item.id)}>
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
					value={login}
					variant='filled'
					leftSection={<SearchIcon size={20} />}
					onChange={(e) => setLogin(e.target.value)}
					placeholder='Поиск по логину'
				/>
				{!(users.length > 0 && 'message' in users[0]) && (
					<Accordion miw={600} variant='contained' chevronPosition='right'>
						{items}
					</Accordion>
				)}
				{users.length === 0 && <Image h={350} radius='md' src={search_people} w={350} />}
				{users.length > 0 && 'message' in users[0] && <Image h={350} radius='md' src={search_not_found} w={350} />}
			</Flex>
		</Container>
	)
}
