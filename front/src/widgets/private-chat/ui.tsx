import { useEditor } from '@tiptap/react'
import { Lock } from 'lucide-react'

import { Box, Divider, Flex, Title } from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

import { isDarkMode } from '@shared/helpers'

export const PrivateChat = () => {
	const editor = useEditor({
		extensions: [StarterKit, Underline, Highlight],
		content
	})
	const { isDark } = isDarkMode()

	return (
		<Box bd='1px solid #D9D9D9' h='300px' mih='100%' p={20} style={{ borderRadius: '20px' }} w='50%'>
			<Flex justify='space-between'>
				<Title fw={600} size={20} order={2}>
					Личный блокнот
				</Title>
				<Lock />
			</Flex>
			<Divider my='sm' variant='dashed' />
			<RichTextEditor variant='subtle' editor={editor}>
				<RichTextEditor.Content />

				<RichTextEditor.Toolbar stickyOffset={60} sticky>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold />
						<RichTextEditor.Italic />
						<RichTextEditor.Underline />
						<RichTextEditor.Strikethrough />
						<RichTextEditor.ClearFormatting />
						<RichTextEditor.Highlight />
						<RichTextEditor.Code />
					</RichTextEditor.ControlsGroup>
				</RichTextEditor.Toolbar>
			</RichTextEditor>
		</Box>
	)
}
