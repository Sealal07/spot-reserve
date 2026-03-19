from fastapi import Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import User, create_db, get_db
from auth import get_password_hash, verify_password, create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter

router = APIRouter()

create_db()


class UserCreate(BaseModel):
    login: str
    email: str
    password: str
    role: str


@router.post('/auth/register')
def user_register(user: UserCreate, db: Session = Depends(get_db)):
    '''Регистрация пользователя'''
    db_user = db.query(User).filter(User.email == user.login).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail='Пользователь уже зарегистрирован!',
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


@router.post('/auth/token')
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    '''Авторизация пользователя'''
    user = db.query(User).filter(User.email == form_data.login).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=400,
            detail='Неверный пользователь или пароль!'
        )
    access_token = create_access_token(data={'sub': user.login})
    return {'access_token': access_token, 'token_type': 'bearer'}