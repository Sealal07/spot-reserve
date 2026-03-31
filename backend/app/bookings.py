from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import datetime, timedelta, timezone
from pydantic import BaseModel
from .models import User, Spot, Booking
from .engine import  get_db
from .auth import get_current_user

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
        current_user: User = Depends(get_current_user)
):
    now = datetime.now()
    start_time = booking_data.start_time.replace(tzinfo=None)
    end_time = booking_data.end_time.replace(tzinfo=None)
    spot_id = booking_data.spot_id

    # Базовая валидация интервала
    if start_time >= end_time:
        raise HTTPException(
            status_code=400,
            detail="Время начала не может быть позже или равно времени окончания"
        )

    if start_time < now:
        raise HTTPException(
            status_code=400,
            detail="Нельзя забронировать место в прошлом"
        )

    # Проверка длительности (макс 12 часов)
    duration_seconds = (end_time - start_time).total_seconds()
    max_duration = 12 * 3600  # 12 часов в секундах
    if duration_seconds > max_duration:
        raise HTTPException(
            status_code=400,
            detail="Максимальное время бронирования — 12 часов"
        )

    # Ищем бронирования для этого же стола, которые пересекаются с нашим временем
    overlapping_booking = db.query(Booking).filter(
        Booking.spot_id == spot_id,
        and_(
            start_time < Booking.end_time,  # Наше начало раньше чьего-то конца
            end_time > Booking.start_time  # Наш конец позже чьего-то начала
        )
    ).first()

    if overlapping_booking:
        raise HTTPException(
            status_code=400,
            detail=f"Этот стол уже забронирован на интервал с {overlapping_booking.start_time.strftime('%H:%M')} до {overlapping_booking.end_time.strftime('%H:%M')}"
        )

    # Создание записи в БД
    try:
        new_booking = Booking(
            user_id=current_user.id,
            spot_id=spot_id,
            start_time=start_time,
            end_time=end_time
        )
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)
        return new_booking

    except Exception as e:
        db.rollback()
        print(f"Ошибка при сохранении в БД: {e}")
        raise HTTPException(
            status_code=500,
            detail="Внутренняя ошибка сервера при создании брони"
        )


@router.get('/my')
def get_my_bookings(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    '''Список своих текущих и прошедших бронирований'''
    my_reservations = db.query(Booking).filter(Booking.user_id == current_user.id).all()
    if current_user:
        if not my_reservations:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='У вас отсутствуют забронированные столики'
            )

    return my_reservations

@router.get("/", response_model=list[BookingResponse])
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
    del_booking = db.query(Booking).filter(Booking.id == id)
    if not del_booking:
        raise HTTPException(status_code=404, detail='Бронирование не найдено!')
    # проверка на удаление другим пользователем
    if not current_user or Booking.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='Вы не можете отменить чужие брони'
        )
    if current_user.role == 'admin' or Booking.user_id == current_user.id:
        db.query(Booking).filter(Booking.id == id).delete()
        db.commit()
        return {'message': 'Успешно удалено'}

    # db.query(Booking).filter(Booking.user_id == current_user.id, Booking.id == id).delete()
    # db.commit()
    # return {'message': 'Успешно удалено'}




