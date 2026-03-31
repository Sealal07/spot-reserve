from fastapi import Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from .models import User
from .engine import get_db
from .auth import get_password_hash, verify_password, create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter

router = APIRouter()




class UserCreate(BaseModel):
    login: str
    email: str
    password: str
    role: str


@router.post('/auth/register')
def user_register(user: UserCreate, db: Session = Depends(get_db)):
    '''Регистрация пользователя'''
    db_user = db.query(User).filter((User.email == user.email) | (User.login == user.login)).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail='Логин или Email уже заняты!',
        )
    new_user = User(
        login=user.login,
        email=user.email,
        hashed_password=get_password_hash(user.password),
        role='user'
    )
    db.add(new_user)
    db.commit()
    return {'message': 'Пользователь создан!'}


# spot_api.py

@router.post('/auth/token')
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # ищем пользователя по логину ИЛИ email
    user = db.query(User).filter(
        (User.email == form_data.username) | (User.login == form_data.username)
    ).first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=400,
            detail='Неверный логин или пароль'
        )

    # Создаем токен, записывая email в поле sub
    access_token = create_access_token(data={'sub': user.email})

    # ОБЯЗАТЕЛЬНО возвращаем token_type
    return {
        'access_token': access_token,
        'token_type': 'bearer'
    }