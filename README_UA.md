# 🗓️ Calendar App - Інструкція з налаштування

## ✅ Виконані зміни в проєкті

### Frontend зміни:
1. **AuthReducer** - повна інтеграція з Redux Toolkit async thunks
2. **EventsReducer** - CRUD операції для подій (fetch, add, delete)
3. **Login/Register** - оновлені компоненти з правильною обробкою форм
4. **Modal** - додавання подій через Redux
5. **App.jsx** - завантаження токена та подій при старті
6. **Header** - показує кнопку Logout коли користувач авторизований

### Backend зміни:
1. **Server/index.js** - повний API для авторизації та подій
2. **Server/.env** - конфігураційний файл
3. **Server/schema.sql** - SQL скрипт для створення БД

---

## 🚀 Як запустити

### Крок 1: Налаштування бази даних

1. Встановіть MySQL (якщо ще не встановлено)

2. Створіть базу даних та таблиці:
   ```sql
   -- Виконайте файл Server/schema.sql у MySQL
   ```

   Або вручну створіть:
   ```sql
   CREATE DATABASE webcalendar;
   USE webcalendar;
   
   CREATE TABLE user (
       id INT AUTO_INCREMENT PRIMARY KEY,
       login VARCHAR(50) NOT NULL UNIQUE,
       email VARCHAR(100) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
   CREATE TABLE events (
       id INT AUTO_INCREMENT PRIMARY KEY,
       user_id INT NOT NULL,
       title VARCHAR(100) NOT NULL,
       date DATE NOT NULL,
       time TIME DEFAULT '00:00:00',
       color VARCHAR(20) DEFAULT '#6366f1',
       FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
   );
   ```

### Крок 2: Налаштування .env файлу

В файлі `Server/.env` замініть:
```env
PASSWORD=your_password_here  → введіть ваш MySQL пароль
SECRET=your_super_secret_key_change_this_in_production → введіть будь-який секретний ключ
```

### Крок 3: Запуск сервера

```bash
cd Server
npm run dev
```

Сервер запуститься на `http://localhost:3000`

### Крок 4: Запуск клієнта

```bash
cd calendar
npm run dev
```

Клієнт запуститься на `http://localhost:5173`

---

## 📋 API Ендпоінти

### Реєстрація / Логін
- `POST /register` - Реєстрація користувача
- `POST /login` - Вхід користувача

### Події (потрібна авторизація)
- `GET /events` - Отримати всі події користувача
- `POST /events` - Створити нову подію
- `DELETE /events/:id` - Видалити подію
- `PUT /events/:id` - Оновити подію

---

## 🔧 Виправлені проблеми

### До змін:
- ❌ Реєстрація працювала частково
- ❌ Події зберігались тільки локально
- ❌ Не було інтеграції з сервером
- ❌ Token не зберігався правильно

### Після змін:
- ✅ Повна реєстрація з автоматичним логином
- ✅ Події зберігаються в базі даних
- ✅ Redux Toolkit async thunks для API запитів
- ✅ JWT токен аутентифікація
- ✅ Автоматичне завантаження подій після логину
- ✅ Logout кнопка працює коректно

---

## 🎨 Дизайн

- Темний градієнтний фон
- Glassmorphism ефекти
- Анімації та переходи
- Responsive дизайн
- Modern UI з градієнтами

---

## 📝 Тестування

1. Зареєструйте нового користувача
2. Автоматичний вхід після реєстрації
3. Додайте подію через + кнопку
4. Подія з'явиться в календарі
5. Оновіть сторінку - події завантажаться з БД
6. Вийдіть через Logout кнопку

---

## ⚠️ Важливо

- Змініть пароль в `.env` на ваш MySQL пароль
- Змініть SECRET ключ на унікальний
- Для продакшену змініть CORS налаштування
