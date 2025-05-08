import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { Search, SearchIcon } from 'lucide-react'

import { Avatar, Badge, Breadcrumbs, Button, Flex, Group, Kbd, Text } from '@mantine/core'
import { Spotlight, spotlight } from '@mantine/spotlight'

import { routes } from '@shared/config'
import { SrcImage } from '@shared/helpers'
import { useDebounce } from '@shared/hooks'
import { changedWorkspace } from '@shared/store'

import type { EntitiesResponse } from './api'
import { $allEntities, clearedAllEntities, sendedQueryAllEntities } from './model'

import styles from './ui.module.css'

interface ActionData {
	breadcrumbs: string[]
	group: string
	href: string
	id: string
	image?: string
	status?: string
	title: string
	onTrigger?: () => void
}

const buildActions = (entities: EntitiesResponse[], query: string, changeWorkspace: (payload: string) => string) => {
	const q = query.toLowerCase()

	const actions = [] as ActionData[]

	if (entities.length > 0 && 'message' in entities[0]) return [{ message: 'NotFound' }]

	entities.forEach((ws) => {
		actions.push({
			id: `ws-${ws.id}`,
			title: ws.title,
			group: 'Workspaces',
			image: SrcImage(ws.image_url),
			breadcrumbs: [ws.title],
			href: `/workspaces/${ws.id}`,
			onTrigger: () => changeWorkspace(ws.id.toString())
		})

		ws.projects.forEach((pr) => {
			actions.push({
				id: `pr-${pr.id}`,
				title: pr.title,
				group: 'Проекты',
				image: SrcImage(pr.image_url),
				breadcrumbs: [ws.title, pr.title],
				href: `/workspaces/${ws.id}/projects/${pr.id}`,
				onTrigger: () => {
					changeWorkspace(ws.id.toString())
					routes.private.project.open({
						projectId: pr.id.toString()
					})
				}
			})

			pr.tasks.forEach((tk) => {
				actions.push({
					id: `tk-${tk.id}`,
					title: tk.title,
					group: 'Задачи',
					status: tk.status,
					breadcrumbs: [ws.title, pr.title, tk.title],
					href: `/workspaces/${ws.id}/projects/${pr.id}/tasks/${tk.id}`
					// onTrigger: () => navigate(`/workspaces/${ws.id}/projects/${pr.id}/tasks/${tk.id}`)
				})
			})
		})
	})

	return actions.filter((entity) => entity.title.toLowerCase().includes(q))
}

export const SidebarSearch = () => {
	const [sendQueryAllEntities, allEntities, clearAllEntities, changeWorkspace] = useUnit([
		sendedQueryAllEntities,
		$allEntities,
		clearedAllEntities,
		changedWorkspace
	])
	const [query, setQuery] = useState('')
	const debouncedValue = useDebounce(query, 500)

	const actions = buildActions(allEntities, debouncedValue, changeWorkspace)

	useEffect(() => {
		if (!debouncedValue) return clearAllEntities()
		sendQueryAllEntities(debouncedValue)
	}, [debouncedValue])

	return (
		<>
			<Button
				className={styles.search__input}
				justify='left'
				radius='md'
				variant='outline'
				w={280}
				fullWidth
				leftSection={<Search />}
				onClick={spotlight.open}
				rightSection={
					<Kbd h='25px' size='xs' w='60px'>
						Ctrl + K
					</Kbd>
				}
			>
				<Text className={styles.search} w={156}>
					Поиск
				</Text>
			</Button>
			<Spotlight.Root query={query} onQueryChange={setQuery} shortcut={['mod + K', 'mod + P']}>
				<Spotlight.Search leftSection={<SearchIcon />} placeholder='Поиск...' />
				{!(allEntities.length === 0) && (
					<Spotlight.ActionsList mah={500}>
						{actions.map((item) => {
							if ('message' in item) {
								return <Spotlight.Empty key='nf'>Ничего не было найдено</Spotlight.Empty>
							}

							return (
								<Spotlight.Action key={item.id} p={10} px={20} highlightQuery onClick={item.onTrigger}>
									<Group w='100%' wrap='nowrap'>
										{item.group === 'Задачи' && (
											<Badge style={{ userSelect: 'none' }} variant='default'>
												{item.status}
											</Badge>
										)}
										{item.image && <Avatar alt={item.title} mah={28} maw={28} miw={28} radius='sm' src={item.image} w={28} />}

										<Flex gap={4} justify='center' direction='column'>
											<Text size='md' style={{ lineHeight: 1 }}>
												{item.title}
											</Text>
											<Text size='xs' component='div' opacity={0.6}>
												{item.breadcrumbs && <Breadcrumbs separator='/'>{item.breadcrumbs}</Breadcrumbs>}
											</Text>
										</Flex>
									</Group>
								</Spotlight.Action>
							)
						})}
					</Spotlight.ActionsList>
				)}
			</Spotlight.Root>
		</>
	)
}
