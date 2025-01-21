export const Loading = ({ width = 48, height = 48 }) => (
	<svg height={height} width={width} xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid' viewBox='0 0 100 100'>
		<g>
			<path
				d='M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z'
				fill='none'
				style={{ transform: 'scale(0.8);transform-origin:50px 50px' }}
				stroke='#f5a6d4'
				strokeDasharray='42.76482137044271 42.76482137044271'
				strokeLinecap='round'
				strokeWidth='8'
			>
				<animate
					attributeName='stroke-dashoffset'
					dur='1s'
					keyTimes='0;1'
					values='0;256.58892822265625'
					repeatCount='indefinite'
				/>
			</path>
		</g>
	</svg>
)
