import { Flex } from '@mantine/core'

import { Loading } from '@app/assets/svg'

export const LoadingPage = () => (
	<Flex align='center' h='100vh' justify='center' w='100%'>
		<Loading height={50} width={50} />
	</Flex>
)
