export const statusColor = (left: number, isOverdue: boolean) => {
	let bgColor

	if (isOverdue) {
		return 'red'
	}

	if (left === 1 || left === 0) {
		bgColor = 'orange'
	} else if (left === 2) {
		bgColor = 'yellow'
	}

	return bgColor
}
