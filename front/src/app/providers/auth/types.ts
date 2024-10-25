export interface AuthProviderProps {
	children: React.ReactNode
}

export interface SessionField {
	isLogin: boolean
	userId: string
	accessToken: string
}

export interface AuthProviderState {
	session: SessionField
	setSession: (user: SessionField) => void
}
