import { useState } from 'react'

import { ColorPicker, ColorSwatch } from '@mantine/core'

import { AccountLayout } from '@app/layouts'
import { ThemeColors } from '@shared/config'

export const Customization = () => {
	const [value, onChange] = useState(ThemeColors.dark)
	return (
		<AccountLayout>
			<ColorPicker value={value} format='hex' onChange={onChange} />
			<ColorSwatch color={value} />
		</AccountLayout>
	)
}
