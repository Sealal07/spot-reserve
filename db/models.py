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
    # Исправлено: связь один ко многим. Назвала переменную 'bookings' вместо 'booking_list'
    # back_populates теперь указывает на переменную 'user' в классе Booking.
    bookings: Mapped[List['Booking']] = relationship('Booking', back_populates='user')

class Spot(Base):
    __tablename__ = 'spots'
    
    id: Mapped[int] = mapped_column(primary_key=True)
    number: Mapped[int] = mapped_column(Integer, unique=True)
    description: Mapped[Optional[str]] = mapped_column(String(1000))
    is_active: Mapped[bool] = mapped_column(default=True)
    
    #  заменила 'spot_list' на  'bookings'.
    bookings: Mapped[List['Booking']] = relationship('Booking', back_populates='spot')

class Booking(Base):
    __tablename__ = 'bookings'
    
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'))
    spot_id: Mapped[int] = mapped_column(ForeignKey('spots.id', ondelete='CASCADE'))
    start_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    end_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    # ДОБАВЛЕНО
    # чтобы связать Foreign Keys с объектами User и Spot
    user: Mapped['User'] = relationship('User', back_populates='bookings')
    spot: Mapped['Spot'] = relationship('Spot', back_populates='bookings')
