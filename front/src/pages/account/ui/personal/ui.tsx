import { AccountLayout } from '@app/layouts/account'
import { Box, Button, Divider, Flex, Select, Text, Textarea, TextInput, Title } from '@mantine/core'

export const Personal = () => {
	return (
		<AccountLayout>
			<Box>
				<Flex w='100%' justify='space-between'>
					<Title mb={10} order={3} size={14} fw={600}>
						Полное имя
					</Title>
				</Flex>
				<Flex w='100%' align='start' h='100%' justify='start' gap={20}>
					<TextInput
						radius='md'
						w='48%'
						label='Имя'
						// {...form.getInputProps('name')}
					/>
					<TextInput
						radius='md'
						w='48%'
						label='Фамилия'
						// {...form.getInputProps('surname')}
					/>
				</Flex>
			</Box>
			<Divider w='100%' mb={20} mt={20} />
			<Box>
				<Flex w='100%' direction='column'>
					<Title mb={10} order={3} size={14} fw={600}>
						О себе
					</Title>
					<Text size='14px' mb={14}>
						Расскажите о немного о себе
					</Text>
					<Textarea w='48%' />
				</Flex>
			</Box>
			<Divider w='100%' mb={20} mt={20} />
			<Box>
				<Flex w='100%' direction='column'>
					<Title mb={10} order={3} size={14} fw={600}>
						Произношение
					</Title>
					<Select w='48%' allowDeselect={false} defaultValue='Не важно' data={['Не важно', 'он/его', 'она/её', 'они/их']} />
				</Flex>
			</Box>
			<Divider w='100%' mb={20} mt={20} />
			<Button type='submit' radius='md' bg='rgb(64, 192, 87)'>
				Сохранить
			</Button>
		</AccountLayout>
	)
}
