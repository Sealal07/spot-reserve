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
    password: str


@app.post('/user_register')
def user_register(user: UserCreate, db: Session = Depends(get_db)):
    '''Регистрация пользователя'''
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail='Пользователь уже зарегистрирован!',
        )
    new_user = User(
        username=user.username,
        hashed_password=get_password_hash(user.password)
    )
    db.add(new_user)
    db.commit()
    return {'message': 'Пользователь создан!'}


@app.post('/token')
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    '''Авторизация пользователя'''
    db: Session = Depends(get_db)
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=400,
            detail='Неверный пользователь и пароль!'
        )
    access_token = create_access_token(data={'sub': user.username})
    return {'access_token': access_token, 'token_type': 'bearer'}