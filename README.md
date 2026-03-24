**SpotReserve** — это веб-приложение для эффективного управления офисными пространствами. Система позволяет сотрудникам бронировать рабочие места (столы) на определенное время, исключая очереди и обеспечивая прозрачность использования офиса.

## Технологический стек

Проект построен на современном стеке:
* **Backend:** Python 3.10+, FastAPI
* **Database:** PostgreSQL 
* **ORM & Migrations:** SQLAlchemy, Alembic 
* **Frontend:** React 
* **Infrastructure:** Docker & Docker Compose 

---

## Настройка окружения (.env)

Для работы приложения необходимо создать файл `.env` в корневой директории проекта. Скопируйте настройки ниже:

```env
# Параметры подключения к базе данных
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=spotreserve
DATABASE_URL=postgresql+psycopg2://postgres:your_password@db:5432/spotreserve

# Настройки безопасности (JWT)
SECRET_KEY=super_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```
---

## Функциональные возможности
**Для пользователей:**
* **Авторизация:** Регистрация и вход с JWT-токенами.
* **Просмотр мест:** Список столов с описанием (например, «у окна», «есть монитор»).
* **Бронирование:** Выбор даты и интервала с проверкой на занятость.
* **Личный кабинет:** История своих текущих и прошедших броней.

**Для администраторов:**
* **Управление ресурсами:** Добавление и удаление рабочих мест.
* **Мониторинг:** Просмотр всех активных бронирований в офисе.
* **Модерация:** Возможность отмены любого бронирования.

---

## Архитектура данных
Система использует три основные сущности:
1. **Users:** id, login, email, hash_password, role (user/admin).
2. **Spots:** id, number, description, is_active.
3. **Bookings:** id, user_id, spot_id, start_time, end_time.

---

## Быстрый запуск
**Клонируйте репозиторий:**
```Bashgit 
clone [https://github.com/Sealal07/spot-reserve.git](https://github.com/Sealal07/spot-reserve.git)
cd spot-reserve
```
**Подготовьте среду:** Создайте файл `.env` на основе примера выше.

**Запустите Docker Compose:**
```Bash
docker-compose up --build
```
*API:* http://localhost:8000, *Swagger:* /docs.

