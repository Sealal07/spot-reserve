import asyncio
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext

from app.models import Base, User, Spot

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

DATABASE_URL = "postgresql+asyncpg://postgres:1234@db:5432/spotreserve_db"

engine = create_async_engine(DATABASE_URL)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def seed_data():
    async with engine.begin() as conn:
        print("Создание таблиц в базе данных...")
        await conn.run_sync(Base.metadata.create_all)


    async with AsyncSessionLocal() as session:
        print("Проверка наличия данных...")
        result = await session.execute(select(User).filter_by(login="admin"))
        existing_admin = result.scalar_one_or_none()

        if existing_admin:
            print("База уже инициализирована. Пропуск.")
            return

        print("Наполнение базы начальными данными...")


        admin_pass = pwd_context.hash("admin123")
        admin = User(
            login="admin",
            email="admin@reserve.ru",
            hashed_password=admin_pass,
            role="admin"
        )

        spots = [
            Spot(number=1, description="У окна, солнечная сторона", is_active=True),
            Spot(number=2, description="В углу, очень тихо", is_active=True),
            Spot(number=3, description="Большой стол с монитором", is_active=True)
        ]

        session.add(admin)
        session.add_all(spots)


        await session.commit()

    print("Данные успешно добавлены! Логин: admin, Пароль: admin123")


if __name__ == "__main__":
    asyncio.run(seed_data())