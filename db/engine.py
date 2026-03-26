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


def is_table(table):
    if table:
        return table
    else:
        return

def simple_select():

    session = Session(engine)

    query = select(User)
    result = session.execute(query)
    users = result.scalars().all()

    spots = session.execute(select(Spot)).scalars().all()
    bookings = session.execute(select(Booking)).scalars().all()

    if is_table(users):
        for user in users:
            print(user.id)
            print(user.login)
            print(user.email)
            print(user.hash_password)
            print(user.role)
            print()
    else: 
        print('table not found')
    
    if is_table(spots):
        for spot in spots:
            print(spot.id)
            print(spot.number)
            print(spot.desciption)
            print(spot.is_active)
            print()
    else:
        print('table not found')

    if is_table(bookings):
        for book in bookings:
            print(book.id)
            print(book.user_id)
            print(book.sport_id)
            print(book.start_time)
            print(book.end_time)
            print(book.user)
            print(book.spot)
            print()
    else:
        print('table not found')

def add_spots():
    [
        'Место рядом с окном',
        'Место рядом под кондиционером',
        'Место рядом с кофейным деревом',
        'Место рядом с библиотекой',
        'Место рядом с автоматом с газировкой'
    ]
    

