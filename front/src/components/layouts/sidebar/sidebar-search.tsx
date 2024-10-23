import { useState } from 'react'
import { Search } from 'lucide-react'

import { Button, Kbd, NavLink, Text } from '@mantine/core'
import { Spotlight, spotlight } from '@mantine/spotlight'

import styles from './sidebar.module.css'

const actions = [
	{
		id: 'home',
		label: 'Home',
		description: 'Get to home page',
		onClick: () => console.log('Home')
	},
	{
		id: 'dashboard',
		label: 'Dashboard',
		description: 'Get full information about current system status',
		onClick: () => console.log('Dashboard')
	},
	{
		id: 'documentation',
		label: 'Documentation',
		description: 'Visit documentation to lean more about all features',
		onClick: () => console.log('Documentation')
	}
]

export const SidebarSearch = () => {
	const [active, setActive] = useState(false)

	const spotlightOpen = () => {
		spotlight.open()
		setActive(true)
	}

	return (
		<>
			<Button
				fullWidth
				variant='outline'
				leftSection={<Search />}
				styles={() => ({
					root: {
						'&:hover': {
							backgroundColor: 'none'
						}
					}
				})}
				justify='left'
				className={styles.root}
				radius='md'
				onClick={spotlightOpen}
				rightSection={<Kbd size='xs'>Ctrl + P</Kbd>}
			>
				<Text w={80} className={styles.search}>
					Поиск
				</Text>
			</Button>
			<Spotlight
				actions={actions}
				nothingFound='Ничего не найдено...'
				highlightQuery
				searchProps={{
					leftSection: <Search />,
					placeholder: 'Поиск...'
				}}
				shortcut={['mod + K', 'mod + P', '/']}
				onSpotlightClose={() => {
					setActive(false)
				}}
				onSpotlightOpen={() => {
					setActive(true)
				}}
			/>
		</>
	)
}
