export interface UserResponse {
	access_token: string
	user: UserFieldResponse
}

export interface UserFieldResponse {
	id: number
	name: string
	email: string
	avatar_url: string
	created_at: string
	updated_at: string
}
