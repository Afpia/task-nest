import { Excel, File, PDF, Word } from '@app/assets/svg'

export const mimeToReadableType = {
	'application/pdf': 'PDF',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
	'application/zip': 'ZIP',
	'application/x-rar-compressed': 'RAR'
}

export const MAX_FILES = 3

export const iconMap = {
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': <Word height={30} width={30} />,
	'application/zip': <File height={30} width={30} />,
	'application/pdf': <PDF height={30} width={30} />,
	'application/x-rar-compressed': <File height={30} width={30} />,
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': <Excel height={30} width={30} />
}
