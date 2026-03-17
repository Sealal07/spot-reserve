from fastapi import Depends, APIRouter, HTTPException
from sqlalchemy.orm import Session
from database import User
from auth import get_current_user

router = APIRouter()

@router.get('/users/me')
def my_profile(current_user: User = Depends(get_current_user)):
    '''Получение данных о текущем авторизованном пользователе'''
    return {
        'user_id': current_user.id,
            'login': current_user.login,
            'email': current_user.email
        }