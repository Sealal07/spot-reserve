from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import datetime
from pydantic import BaseModel

from models import User, Spot, Booking
from engine import  get_db
from auth import get_current_user

router = APIRouter(prefix="/bookings", tags=["Bookings"])  # перенесла сюда /bookings


# схема для входных данных
class BookingCreate(BaseModel):
    spot_id: int
    start_time: datetime
    end_time: datetime


# схема для ответа
class BookingResponse(BaseModel):
    id: int
    spot_id: int
    start_time: datetime
    end_time: datetime

    class Config:
        from_attributes = True


@router.post("/", response_model=BookingResponse)
def create_booking(
        booking_data: BookingCreate,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)):
    """создание брони с проверкой доступности по времени"""

    # проверяем, существует ли стол и активен ли он
    spot = db.query(Spot).filter(Spot.id == booking_data.spot_id, Spot.is_active == True).first()
    if not spot:
        raise HTTPException(status_code=404, detail="Стол не найден или деактивирован")

    # проверка на пересечение временных интервалов
    # Формула: (RequestStart < ExistingEnd) AND (RequestEnd > ExistingStart)
    overlap = db.query(Booking).filter(
        Booking.spot_id == booking_data.spot_id,
        and_(
            booking_data.start_time < Booking.end_time,
            booking_data.end_time > Booking.start_time
        )
    ).first()

    if overlap:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Этот стол уже забронирован на выбранное время"
        )

    # создание записи
    new_booking = Booking(
        user_id=current_user.id,
        spot_id=booking_data.spot_id,
        start_time=booking_data.start_time,
        end_time=booking_data.end_time
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking


@router.get('/my')
def get_my_bookings(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    '''Список своих текущих и прошедших бронирований'''
    my_reservations = db.query(Booking).filter(Booking.user_id == current_user.id).all()
    if current_user:
        if not my_reservations:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='У вас отсутствуют забронированные столики'
            )

    return my_reservations

@router.get("/")
def get_all_bookings_for_admin(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    '''Получение всех броней админом'''
    if current_user.role != 'admin':
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='Только администратор может просмотреть все брони'
        )
    all_bookings = db.query(Booking).all()
    if not all_bookings:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Брони отсутствуют'
        )
    return all_bookings


@router.delete('/{id}')
def delete_booking(id:int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    '''Отмена брони для юзера и удаление брони для админа'''
    if current_user.role != 'admin' and booking.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='Вы не можете отменить чужие брони'
        )
    if current_user.role == 'admin':
        db.query(Booking).filter(Booking.id == id).delete()
        db.commit()
        return {'message': 'Успешно удалено'}

    db.query(Booking).filter(Booking.user_id == current_user.id, Booking.id == id).delete()
    db.commit()
    return {'message': 'Успешно удалено'}




