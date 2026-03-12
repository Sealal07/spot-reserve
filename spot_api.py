from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import User, create_db, get_db
from starlette.middleware.cors import CORSMiddleware
from auth import get_password_hash, verify_password, create_access_token
from fastapi.security import OAuth2PasswordRequestForm

app = FastAPI(title='Spot Reserve API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

create_db()


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role: str


@app.post('/auth/register')
def user_register(user: UserCreate, db: Session = Depends(get_db)):
    '''Регистрация пользователя'''
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail='Пользователь уже зарегистрирован!',
        )
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=get_password_hash(user.password),
        role=user.role
    )
    db.add(new_user)
    db.commit()
    return {'message': 'Пользователь создан!'}


@app.post('/auth/token')
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    '''Авторизация пользователя'''
    user = db.query(User).filter(User.email == form_data.email).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=400,
            detail='Неверный пользователь или пароль!'
        )
    access_token = create_access_token(data={'sub': user.username})
    return {'access_token': access_token, 'token_type': 'bearer'}