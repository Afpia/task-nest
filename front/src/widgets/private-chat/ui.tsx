import { useEditor } from '@tiptap/react'
import { Lock } from 'lucide-react'

import { AspectRatio, Box, Divider, Flex, ScrollArea, Title } from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

import { isDarkMode } from '@shared/helpers'

// const content = '<p>Subtle rich text editor variant</p>'

export const PrivateChat = () => {
	const editor = useEditor({
		extensions: [StarterKit, Underline, Highlight],

		content: `
        <p>The Text extension is required, at least if you want to have text in your text editor and that’s very likely.</p>
      `
	})

	return (
		<Box bd='1px solid #D9D9D9' h='300px' mih='100%' p={20} style={{ borderRadius: '20px' }} w='50%'>
			<Flex justify='space-between'>
				<Title fw={600} size={20} order={2}>
					Личный блокнот
				</Title>
				<Lock />
			</Flex>
			<Divider my='sm' variant='dashed' />
			<RichTextEditor
				variant='subtle'
				styles={{
					content: { background: 'inherit', padding: 0 },
					toolbar: { background: 'inherit', margin: 0, padding: 0 },
					root: { border: 'none' },
					controlsGroup: { background: 'inherit' },
					control: { background: 'inherit' }
				}}
				editor={editor}
			>
				<RichTextEditor.Toolbar sticky>
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
				<ScrollArea mah='165px' type='always' scrollbars='y'>
					<RichTextEditor.Content mih='165px' />
				</ScrollArea>
			</RichTextEditor>
		</Box>
	)
}
