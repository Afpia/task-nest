export const AvatarSrc = (src: string) => {
	if (src?.startsWith('/storage/avatar/')) return `${import.meta.env.VITE_BACKEND}${src}`

	return src
}
