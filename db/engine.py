from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from models import User, Spot, Booking, Base


DATABASE_URL = 'postgresql://postgres:1234@localhost:5432/SpotReserve'
engine = create_engine(DATABASE_URL)


# инициализируй базу данных в первый раз?
def init_db():
    Base.metadata.create_all(bind=engine)


# простое добавление юзера
def db_seed():
    with Session(engine) as session:
        person_one = User(
            login='login_person_one',
            email='person_one@mail.com',
            hash_password='1234',
            role='customer'
        )
        session.add(person_one)
        session.commit()