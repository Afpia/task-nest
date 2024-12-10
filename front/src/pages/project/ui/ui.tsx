import { useUnit } from 'effector-react'

import { routes } from '@shared/config'

export const Project = () => {
	const [params] = useUnit([routes.private.project.$params])

	return (
		<div>
			Hello
			{params.projectId}
		</div>
	)
}
