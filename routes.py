from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from database import User, Spot, get_db
from sqlalchemy.sql.functions import current_user

app = FastAPI(title='Spot Reserve API')

@app.get('/spots')
def get_all_spots(db: Session = Depends(get_db)):
    '''Получения списка всех столов'''
    db_spots = db.query(Spot).all()
    return db_spots

@app.post('/spots')
def create_spot(db: Session = Depends(get_db)):
    '''Создание стола'''
    user_admin = db.query(User).filter(User.role == 'admin').first()
    if not user_admin:
        raise HTTPException(
            status_code=400,
            detail='Только администратор может добавлять столы!'

        )
    else:
        new_spot = Spot(

        )
