export const statusColor = (left: number) => {
	let bgColor

	if (left === 1 || left === 0) {
		bgColor = 'red'
	} else if (left === 2) {
		bgColor = 'yellow'
	}
	return bgColor
}
