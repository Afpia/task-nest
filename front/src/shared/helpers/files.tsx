import { Excel, File, PDF, Word } from '@app/assets/svg'

export const MIME_TO_READABLE_TYPE = {
	'application/pdf': 'PDF',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
	'application/zip': 'ZIP',
	'application/x-rar-compressed': 'RAR'
}

export const MAX_FILES = 3

export const ICON_MAP = {
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': <Word height={30} width={30} />,
	'application/zip': <File height={30} width={30} />,
	'application/pdf': <PDF height={30} width={30} />,
	'application/x-rar-compressed': <File height={30} width={30} />,
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': <Excel height={30} width={30} />
}

export function formatFileSize(size: number) {
	if (size < 1024) {
		return `${size} B`
	} else if (size < 1024 * 1024) {
		return `${(size / 1024).toFixed(2)} KB`
	} else if (size < 1024 * 1024 * 1024) {
		return `${(size / (1024 * 1024)).toFixed(2)} MB`
	} else {
		return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`
	}
}
export const ACCEPT =
	'application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/zip,application/x-rar-compressed,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
