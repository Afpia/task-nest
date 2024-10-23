import { Search } from 'lucide-react'

import { Button, Kbd, Text } from '@mantine/core'
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

export const SidebarSearch = () => (
	<>
		<Button
			fullWidth
			variant='outline'
			leftSection={<Search />}
			justify='left'
			className={styles.searchInput}
			radius='md'
			onClick={spotlight.open}
			rightSection={<Kbd size='xs'>Ctrl + K</Kbd>}
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
			shortcut={['mod + K', 'mod + P']}
		/>
	</>
)
