// import { createEvent, createStore, sample } from 'effector'

// const $token = createStore('')
// export const tokenReceived = createEvent<string>()
// export const tokenExpired = createEvent()

// sample({
// 	clock: tokenReceived,
// 	target: $token
// })

// sample({
// 	clock: tokenExpired,
// 	fn: () => '',
// 	target: $token
// })

// export const $isAuth = $token.map((token) => !!token)
