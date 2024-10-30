import { createContext } from 'react'

import type { AuthProviderState } from './types'

const initialState: AuthProviderState = {
	session: {
		access_token: '',
		user: {
			id: 0,
			name: '',
			email: '',
			role: '',
			created_at: '',
			updated_at: ''
		}
	},
	setSession: () => null
}

export const AuthContext = createContext<AuthProviderState>(initialState)
