export const Loading2 = ({ width = 48, height = 48 }) => (
	<svg height={height} width={width} preserveAspectRatio='xMidYMid' viewBox='0 0 100 100'>
		<g>
			<circle
				cx='50'
				cy='50'
				fill='none'
				r='35'
				stroke='#f5a6d4'
				strokeDasharray='164.93361431346415 56.97787143782138'
				strokeWidth='10'
			>
				<animateTransform
					attributeName='transform'
					dur='1s'
					keyTimes='0;1'
					type='rotate'
					values='0 50 50;360 50 50'
					repeatCount='indefinite'
				/>
			</circle>
		</g>
	</svg>
)
