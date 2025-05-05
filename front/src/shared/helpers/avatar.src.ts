export const SrcImage = (src: string) => {
	if (src?.startsWith('/storage/avatar/') || src?.startsWith('/storage/background/'))
		return `${import.meta.env.VITE_BACKEND}${src}`

	return src
}
