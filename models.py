from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, Integer, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    login: Mapped[str] = mapped_column(String(30), unique=True)
    email: Mapped[str] = mapped_column(String(30), unique=True)
    hash_password: Mapped[str] = mapped_column(String)
    role: Mapped[str] = mapped_column(String(20))
    # один ко многим (Booking.user_id)
    booking_list: Mapped[List['Booking']] = relationship('Booking', back_populates='users_bookingr')

class Spot(Base):
    __tablename__ = 'spots'
    id: Mapped[int] = mapped_column(primary_key=True)
    number: Mapped[int] = mapped_column(Integer, unique=True)
    description: Mapped[str] = mapped_column(String(1000))
    # один ко многим(Booking.spot_id)
    spot_list: Mapped[List['Booking']] = relationship('Booking', back_populates='spot') # spot_list подумать над названием
    is_active: Mapped[bool] = mapped_column(default=True)


class Booking(Base):
    __tablename__ = 'bookings'
    id: Mapped[int] = mapped_column(primary_key=True)
    # users.id
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'))
    # spots.id
    spot_id: Mapped[int] = mapped_column(ForeignKey('spots.id', ondelete='CASCADE'))
    start_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    end_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
