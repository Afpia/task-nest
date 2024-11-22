
# API
## Эндпоинты:

<!-- -	/api/users - работа с пользователями
-	/api/reports - генерация и получение отчетов -->

### /api/login - авторизация - POST
#### Поля отправки:
-	email (string) - Email должен быть уникальным и валидным
-	password (string) - Пароль минимум 8 символов, должен содержать цифры и буквы
#### Поля принимаемые:
- access_token - токен пользователя
- id (number) - ID пользователя
- name (string) - Имя пользователя
- email (string) - Почта пользователя
- role (string) - Роль пользователя
- created_at (string) - Дата создания пользователя
- updated_at (string) - Дата обновления пользователя

### /api/signup - регистрация - POST
#### Поля отправки:
-	name (string) - Имя пользователя
-	email (string) - Email должен быть уникальным и валидным
-	password (string) - Пароль минимум 8 символов, должен содержать цифры и буквы
#### Поля принимаемые:
- access_token (string) - токен пользователя
- id (number) - ID пользователя
- name (string) - Имя пользователя
- email (string) - Почта пользователя
- role (string) - Роль пользователя
- created_at (string) - Дата создания пользователя
- updated_at (string) - Дата обновления пользователя

### /api/projects - получение всех проектов - GET
#### Поля принимаемые:
- id (number) - ID проекта
- title (string) - Название проекта

### /api/user/projects - получение всех проектов пользователя - POST
#### Поля отправки:
-	user_id (number) - ID пользователя
#### Поля принимаемые:
- id (number) - ID проекта
-	title (string) - Название проекта

### /api/project/{id: project} - получение одного проекта - GET
- id (number) - ID проекта
-	title (string) - Название проекта
-	description (string) - Детальное описание проекта
-	start_date (string) - Дата начала проекта
-	end_date (string) - Дата планируемого окончания проекта
-	status (string) - Статусы проекта: "Создан", "В процессе", "Завершён"
-	remaining_days (number) - Количество дней до завершения проекта

### /api/project/add - работа с проектами - POST
#### Поля отправки:
- user_id (number) - ID пользователя
-	title (string) - Название проекта
-	description (string) - Детальное описание проекта
-	start_date (string) - Дата начала проекта
-	end_date (string) - Дата планируемого окончания проекта
-	status (string) - Статусы проекта:  ('created', 'in_progress', 'completed') 
-	remaining_days (number) - Количество дней до завершения проекта

### /api/tasks?filter={filter: priority("low")} - получение всех задач - POST
#### Поля отправки:
- user_id (number) - ID пользователя
- project_id (number) - ID проекта
#### Поля принимаемые:
- id (number) - ID задачи
- title (string) - Название задачи
- priority (string) - Приоритет задачи: ("low", "medium", "high")
-	remaining_days (number) - Количество дней до завершения задачи

### /api/task/{id: task} - получение одной задачи - GET
#### Поля принимаемые:
- title (string) - Название задачи
- description (string) - Детальное описание задачи
- priority (string) - Приоритет задачи: ("low", "medium", "high")
-	remaining_days (number) - Количество дней до завершения задачи
-	start_date (string) - Дата начала задачи
-	end_date (string) - Дата планируемого окончания задачи
-	status (string) - Статусы задачи:  ('created', 'in_progress', 'completed') 
-	remaining_days (number) - Количество дней до завершения задачи

### /api/addTask - добавление задачи - POST
#### Поля отправки:
- project_id (number) - ID проекта
- user_id (number) - ID исполнителя
- priority (string) - Приоритет задачи: ("low", "medium", "high")
- title (string) - Название задачи
- description (string) - Детальное описание задачи
-	start_date (string) - Дата начала задачи
-	end_date (string) - Дата планируемого окончания задачи
-	status (string) - Статусы задачи:  ('created', 'in_progress', 'completed') 
-	remaining_days (number) - Количество дней до завершения задачи





