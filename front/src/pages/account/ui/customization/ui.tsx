import { useState } from 'react'

import { ColorPicker, ColorSwatch, Text } from '@mantine/core'

import { AccountLayout } from '@app/layouts'
import { ThemeColors } from '@shared/config'

export const Customization = () => {
	const [value, onChange] = useState(ThemeColors.dark)
	return (
		<AccountLayout>
			<ColorPicker format='hex' value={value} onChange={onChange} />
			<ColorSwatch color={value} />
		</AccountLayout>
	)
}
