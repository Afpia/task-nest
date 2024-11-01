import { useState } from 'react'

import type { UserResponse } from '@shared/types'

import { AuthContext } from './auth.context'
import type { AuthProviderProps } from './types'

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [session, setSession] = useState<UserResponse>(
		(JSON.parse(localStorage.getItem('session') as string) as UserResponse) || {
			accessToken: '',
			user: {}
		}
	)

	const value = {
		session,
		setSession: (user: UserResponse) => {
			localStorage.setItem('session', JSON.stringify(user))
			setSession(user)
		}
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
