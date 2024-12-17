import { ArrowDown, ChevronDown, Maximize2, Minimize2, Plus, ScreenShare, Settings2 } from 'lucide-react'

import {
	ActionIcon,
	Avatar,
	Badge,
	Box,
	Button,
	Checkbox,
	Divider,
	Drawer,
	Flex,
	Group,
	Progress,
	Table,
	Text,
	Title
} from '@mantine/core'
import { useDisclosure, useFullscreen } from '@mantine/hooks'

import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'

const elements = [
	{ position: 6, mass: 12.011, symbol: 'C', name: 'Carbon', progress: 100 },
	{ position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen', progress: 100 },
	{ position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium', progress: 100 },
	{ position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium', progress: 100 }
]

export const Tasks = () => {
	const [opened, { open, close }] = useDisclosure(false)
	const { toggle, fullscreen } = useFullscreen()
	const { isDark } = isDarkMode()

	const rows = elements.map((element) => (
		<Table.Tr key={element.name} h={50}>
			<Table.Td>
				<Checkbox aria-label='Select row' />
			</Table.Td>
			<Table.Td>
				<Text>Чистить вилкой</Text>
			</Table.Td>
			<Table.Td>
				<Flex align='center' gap={8}>
					<Avatar size={30} />
					<Text fw='bold' fz={14}>
						Филипп Алесандрович
					</Text>
				</Flex>
			</Table.Td>
			<Table.Td>Январь 24 2024, 18:00</Table.Td>
			<Table.Td>
				<Badge color='lime'>Завершен</Badge>
			</Table.Td>
			<Table.Td>
				<Flex justify='space-between' gap={20}>
					<Flex align='center' gap={60}>
						<Text fw='bold'>100%</Text>
						<Progress value={70} w={100} />
					</Flex>
					<ActionIcon h='100%' w='30px' variant='default' aria-label='Settings'>
						<ChevronDown style={{ width: '70%', height: '70%' }} />
					</ActionIcon>
				</Flex>
			</Table.Td>
		</Table.Tr>
	))

	return (
		<>
			<Box p={20} style={{ borderRadius: '20px' }} w='100%' h='100%' mih='500px' bd='1px solid #D9D9D9'>
				<Flex justify='space-between' align='center'>
					<Group justify='center' gap={8}>
						<Button variant='filled' radius='md' size='xs'>
							Таблица
						</Button>

						<Button variant='default' radius='md' size='xs'>
							Канбан доска
						</Button>
					</Group>
					<Flex gap={10}>
						<Button leftSection={<Plus />} variant='filled' radius='md' size='xs' onClick={open}>
							Добавить
						</Button>
						<ActionIcon h='100%' w='30px' variant='default' aria-label='Settings'>
							<Settings2 style={{ width: '70%', height: '70%' }} />
						</ActionIcon>
					</Flex>
				</Flex>
				<Divider my='lg' variant='dashed' />
				<Box bd='1px solid #D9D9D9' style={{ borderRadius: '10px', overflow: 'hidden' }}>
					<Table highlightOnHover stickyHeader>
						<Table.Thead bg={isDark ? ThemeColors.dark : ThemeColors.light}>
							<Table.Tr h={40}>
								<Table.Th w={20}>
									<Checkbox aria-label='Select row' />
								</Table.Th>
								<Table.Th w={350}>Название задачи</Table.Th>
								<Table.Th w={350}>Назначенный</Table.Th>
								<Table.Th w={250}>Срок</Table.Th>
								<Table.Th w={200}>Статус</Table.Th>
								<Table.Th>Прогресс</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{rows}</Table.Tbody>
					</Table>
				</Box>
			</Box>
			<Drawer
				opened={opened}
				position='right'
				size='lg'
				onClose={close}
				overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
				withCloseButton={false}
				radius='20px 0 0 20px'
			>
				<Flex mb={10}>
					<Flex gap={10} align='center'>
						{fullscreen ? <Minimize2 onClick={toggle} cursor='pointer' /> : <Maximize2 onClick={toggle} cursor='pointer' />}
						<Divider orientation='vertical' variant='dashed' />
					</Flex>
					<Drawer.CloseButton />
				</Flex>
				<Divider variant='dashed' mb={20} />
				<Title>Создание задачи</Title>
			</Drawer>
		</>
	)
}
