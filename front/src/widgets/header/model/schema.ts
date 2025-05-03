import { path } from '@shared/config'
import type { UserFieldResponse } from '@shared/types'

export const headerSchema = {
	[path.HOME]: { title: 'Главная', subtitle: 'Контролируйте все свои проекты и задачи здесь' },
	[path.ACCOUNT]: {
		title: 'Настройки',
		subtitle: 'Управляйте основными настройками аккаунта'
	},
	[path.ACCOUNT_PASSWORD]: {
		title: 'Настройки',
		subtitle: 'Обновите текущий пароль для надёжной защиты ваших данных и учётной записи'
	},
	[path.ACCOUNT_PERSONAL]: {
		title: 'Настройки',
		subtitle: 'Настройте свои персональные данные'
	},
	[path.SEARCH]: { title: 'Поиск', subtitle: 'Найдите друзей для своего проекта' },
	[path.ANALYTICS]: { title: 'Аналитика', subtitle: '' },
	[path.PROJECT.replace(/\/:projectId$/, '')]: {
		title: 'Подробности проекта',
		subtitle: 'Управляйте проектом и задачами здесь'
	}
}

export const resolveHeader = (pathname: string, userId?: string, user?: UserFieldResponse) => {
	const normalized = pathname.replace(/\/\d+$/, '')

	if (normalized === path.PROFILE.replace(/\/:userId$/, '')) {
		if (userId && user?.id !== null && String(user?.id) === userId) {
			return {
				title: 'Мой профиль',
				subtitle: 'Просмотр своего публичного профиля'
			}
		}
		return {
			title: 'Профиль пользователя',
			subtitle: 'Просмотр публичного профиля другого участника'
		}
	}

	if (Object.hasOwn(headerSchema, normalized)) {
		return headerSchema[normalized as keyof typeof headerSchema]
	}

	return { title: '', subtitle: '' }
}
