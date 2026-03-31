from sqlite3 import IntegrityError
from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session, session
from .models import User, Spot
from .engine import get_db
from .auth import get_current_user
from pydantic import BaseModel

router = APIRouter()

class SpotCreate(BaseModel):
    number: int
    description: str

@router.get('/spots')
def get_all_spots(db: Session = Depends(get_db)):
    '''Получения списка всех столов'''
    db_spots = db.query(Spot).all()
    return db_spots


@router.post('/spots')
def create_spot(spot_data: SpotCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    '''Создание стола'''
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail='Только администратор может добавлять столы!')

    try:
        new_spot = Spot(
            number=spot_data.number,
            description=spot_data.description
        )
        db.add(new_spot)
        db.commit()
        db.refresh(new_spot)
        return new_spot
    except Exception:
        db.rollback()
        raise HTTPException(status_code=400, detail='Стол с таким номером уже существует!')


@router.delete('/spots/{spot_id}')
def delete_spot(spot_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    '''Удаление стола'''
    # проверка на существование стола
    del_spot = db.query(Spot).filter(Spot.id == spot_id).first()
    if not del_spot:
        raise HTTPException(status_code=404, detail='Стол не найден!')
    # проверяем пользователя на админа
    if current_user.role != 'admin':
        raise HTTPException(
            status_code=403,
            detail='Только администратор может удалять столы!'
        )


    db.delete(del_spot)
    db.commit()
    return {'Message': 'Стол успешно удален!'}
