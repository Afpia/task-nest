import type { UserFieldResponse } from '@shared/types'

export interface AuthProviderProps {
	children: React.ReactNode
}

export interface SessionField {
	isLogin: boolean
	accessToken: string
	user: Partial<UserFieldResponse>
}

export interface AuthProviderState {
	session: SessionField
	setSession: (user: SessionField) => void
}
