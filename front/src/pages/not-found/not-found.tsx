import { Flex, Text } from '@mantine/core'
import gif from '@assets/gif/1.gif'
import gif2 from '@assets/gif/2.gif'
import gif3 from '@assets/gif/3.gif'
import styles from './not-found.module.css'

export const NotFound = () => {
	return (
		<Flex h='100vh' w='100vw' justify='center' align='center'>
			<Text fz={'60px'}>404 Not Found</Text>
			<img src={gif} alt='404' className={styles.gif} />
			<img src={gif2} alt='404' className={styles.gif2} />
			<img src={gif3} alt='404' className={styles.gif3} />
		</Flex>
	)
}
