import { createContext } from 'react'

import type { AuthProviderState } from './types'

const initialState: AuthProviderState = {
	session: {
		isLogin: false,
		accessToken: '',
		user: {}
	},
	setSession: () => null
}

export const AuthContext = createContext<AuthProviderState>(initialState)
