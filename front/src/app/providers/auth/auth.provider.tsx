import { useState } from 'react'

import { AuthContext } from './auth.context'
import type { AuthProviderProps, SessionField } from './types'

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [session, setSession] = useState<SessionField>(
		(JSON.parse(localStorage.getItem('session') as string) as SessionField) || {
			isLogin: false,
			accessToken: '',
			user: {}
		}
	)

	const value = {
		session,
		setSession: (user: SessionField) => {
			localStorage.setItem('session', JSON.stringify(user))
			setSession(user)
		}
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
