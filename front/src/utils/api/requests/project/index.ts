import { api } from '@utils/api/instance'

export interface ProjectsRequest {
	user_id: number
}

export interface ProjectsResponse {
	id: number
	title: string
}

export interface UserParams {
	user_id: number
}

// export interface UserResponse {
// 	id: number
// 	title: string
// }

export type PostProjectConfig = AxiosRequestConfig<undefined, ProjectsRequest>

export type GetUserProjectsConfig = AxiosRequestConfig<UserParams, undefined>

// export const postUserProjects = async (requestConfig?: PostProjectConfig) => api.post('projects', requestConfig)

export const getUserProjects = async ({ config, params }: GetUserProjectsConfig) =>
	api.get(`user/${params.user_id}/projects`, config)
