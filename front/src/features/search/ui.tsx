import { Search } from 'lucide-react'

import { Button, Kbd, Text } from '@mantine/core'
import { Spotlight, spotlight } from '@mantine/spotlight'

import styles from './ui.module.css'

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
		<Spotlight
			highlightQuery
			actions={actions}
			nothingFound='Ничего не найдено...'
			searchProps={{
				leftSection: <Search />,
				placeholder: 'Поиск...'
			}}
			shortcut={['mod + K', 'mod + P']}
		/>
	</>
)
