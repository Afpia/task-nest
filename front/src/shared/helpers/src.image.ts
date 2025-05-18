export const SrcImage = (src: string | undefined) => {
	if (src?.startsWith('/storage/avatar/') || src?.startsWith('/storage/background/') || src?.startsWith('/storage/workspace/'))
		return `${import.meta.env.VITE_BACKEND}${src}`

	if (src?.startsWith('/tasks/')) return `${import.meta.env.VITE_BACKEND}/storage/${src}`

	return src
}
