export const ROLE = {
	ADMIN: 'admin',
	OWNER: 'owner',
	EXECUTOR: 'executor',
	PROJECT_MANAGER: 'project_manager'
} as const

export const ROLE_NAMING = {
	owner: 'Владелец',
	admin: 'Админ',
	executor: 'Исполнитель',
	project_manager: 'Проектный менеджер'
} as const
