import { useContext } from 'react'

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (context === undefined) throw new Error('useAuth должен быть в контексте')

	return context
}
