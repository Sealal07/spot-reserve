from typing import Optional, List
from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    surname: Mapped[str] = mapped_column(String(30))
    patronymic: Mapped[str] = mapped_column(String(30))
    email: Mapped[str] = mapped_column(String(50))
    hash_password: Mapped[str] = mapped_column(String)
    # question 
    role: Mapped[str] = mapped_column(String(20))
    # один ко многим (Booking.user_booking_id)
    booking_list: Mapped[List['Booking']] = 
    booking_limit: Mapped[Optional[int]] = mapped_column(Integer)

class Spot(Base):
    __tablename__ = 'spots'
    id: Mapped[int] = mapped_column(primary_key=True)
    pass

class Booking(Base):
    __tablename__ = 'bookings'
    id: Mapped[int] = mapped_column(primary_key=True)
    user_booking_id: Mapped # (users.id)

    spot_id # (spots.id)
    booked_at
    expired_at


