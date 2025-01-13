export interface UserResponse {
	access_token: string
	user: UserFieldResponse
}

export interface UserFieldResponse {
	avatar_url: string
	created_at: string
	email: string
	id: number
	name: string
	updated_at: string
}
