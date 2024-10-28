import type { UserResponse } from '@shared/types'

export interface AuthProviderProps {
	children: React.ReactNode
}

export interface SessionField {
	isLogin: boolean
	accessToken: string
	user: Partial<UserResponse>
}

export interface AuthProviderState {
	session: SessionField
	setSession: (user: SessionField) => void
}
