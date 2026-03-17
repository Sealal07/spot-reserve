from anyio import current_effective_deadline
from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from database import User, Spot, Booking, get_db

from auth import get_current_user

router = APIRouter()


@router.post('/bookings')
def create_booking(user_id: int, spot_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    '''Создание брони с проверкой доступности'''
    spot = db.query(Spot).filter(Spot.is_active == True).first()
    if not spot:
        raise HTTPException(
            status_code=404,
            detail='Стол не найден или уже забронирован!'
        )
    if spot:
        new_booking = Booking(
            user_id=current_user.id,
            spot_id=spot_id,
            is_active=False,
        )
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)

        return {'Message': 'Стол успешно забронирован!'}


@router.get('/bookings/my')
def get_my_bookings(user_id: int, db: Session = Depends(get_db)):
    '''Список своих текущих и прошедших бронирований'''