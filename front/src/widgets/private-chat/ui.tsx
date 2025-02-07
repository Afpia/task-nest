import { useEditor } from '@tiptap/react'
import { Lock } from 'lucide-react'

import { Box, Divider, Flex, ScrollArea, Title } from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'

import { ThemeColors } from '@shared/config'
import { isDarkMode } from '@shared/helpers'

export const PrivateChat = () => {
	const { isDark } = isDarkMode()

	const editor = useEditor({
		extensions: [StarterKit, Underline, Highlight],

		content: `
        <p>Напиши здесь что-нибудь...</p>
      `
	})

	return (
		<Box
			bd={`1px solid ${isDark ? ThemeColors.accentDarkBorder : ThemeColors.accentLightBorder}`}
			h='300px'
			mih='100%'
			p={20}
			style={{ borderRadius: '20px' }}
			w='50%'
		>
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
				<ScrollArea mah='165px' type='never' scrollbars='y'>
					<RichTextEditor.Content mih='165px' />
				</ScrollArea>
			</RichTextEditor>
		</Box>
	)
}
