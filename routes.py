from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from database import User, Spot, get_db
from auth import get_current_user

router = APIRouter()

@router.get('/spots')
def get_all_spots(db: Session = Depends(get_db)):
    '''Получения списка всех столов'''
    db_spots = db.query(Spot).all()
    return db_spots

@router.post('/spots')
def create_spot(db: Session = Depends(get_db), current_user: User = Depends(get_current_user), number=None, description=None):
    '''Создание стола'''
    # проверяем пользователя на админа
    if current_user.role != 'admin':
        raise HTTPException(
            status_code=403,
            detail='Только администратор может добавлять столы!'
        )
    else:
        new_spot = Spot(
            number=number,
            description=description

        )
        db.add(new_spot)
        db.commit()
        return {'Message': 'Стол успешно создан!'}


@router.post('/spots/{id}')
def delete_spot(spot_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    '''Удаление стола'''
    # проверяем пользователя на админа
    if current_user.role != 'admin':
        raise HTTPException(
            status_code=403,
            detail='Только администратор может удалять столы!'
        )
    else:
        del_spot = db.query(Spot).filter(Spot.id == spot_id).first()
        db.delete(del_spot)
        db.commit()
        return {'Message': 'Стол успешно удален!'}
