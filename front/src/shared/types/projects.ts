export type ProjectsResponse = {
	id: number
	title: string
	description: string
	start_date: string
	end_date: string
	status: string
	remaining_days: number
	image_url: string
}[]

export interface ProjectsParams {
	workspace: string
}
