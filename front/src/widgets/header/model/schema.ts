import { path } from '@shared/config'

export const headerSchema = {
	[path.HOME]: { title: 'Главная', subtitle: 'Контролируйте все свои проекты и задачи здесь' },
	[path.ACCOUNT]: {
		title: 'Настройки',
		subtitle: 'Настройте свой профиль и предпочтения'
	},
	[path.ACCOUNT_PASSWORD]: {
		title: 'Настройки',
		subtitle: 'Измените пароль'
	},
	[path.ACCOUNT_PERSONAL]: {
		title: 'Настройки',
		subtitle: 'Настройте свои персональные данные'
	},
	[path.PROFILE]: { title: 'Профиль', subtitle: 'Просмотр своего публичного профиля' },
	[path.ANALYTICS]: { title: 'Аналитика', subtitle: '' },
	[path.PROJECT]: {
		title: 'Подробности проекта',
		subtitle: 'Управляйте проектом и задачами здесь'
	}
}
