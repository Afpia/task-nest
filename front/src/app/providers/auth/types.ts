import type { UserResponse } from '@shared/types'

export interface AuthProviderProps {
	children: React.ReactNode
}

export interface AuthProviderState {
	session: UserResponse
	setSession: (user: UserResponse) => void
}
