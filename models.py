from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    login: Mapped[str] = mapped_column(String(30))
    email: Mapped[str] = mapped_column(String(30))
    hash_password: Mapped[str] = mapped_column(String)
    role: Mapped[str] = mapped_column(String(20))
    # один ко многим (Booking.user_id)
    booking_list: Mapped[List['Booking']] = relationship()

class Spot(Base):
    __tablename__ = 'spots'
    id: Mapped[int] = mapped_column(primary_key=True)
    number: Mapped[int] = mapped_column(Integer)
    description: Mapped[str] = mapped_column(String(1000))
    # один ко многим(Booking.spot_id)
    spot_booking_list: Mapped[List['Booking']]

class Booking(Base):
    __tablename__ = 'bookings'
    id: Mapped[int] = mapped_column(primary_key=True)
    # users.id
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    # spots.id
    spot_id: Mapped[int] = mapped_column(ForeignKey('spots.id'))
    start_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    end_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
