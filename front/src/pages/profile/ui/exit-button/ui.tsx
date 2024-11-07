import { useUnit } from 'effector-react'

import { Button } from '@mantine/core'
import { allUserExpired } from '@shared/auth'

export const ButtonExit = () => {
	const [onExit] = useUnit([allUserExpired])

	return <Button onClick={onExit}>Выйти</Button>
}
