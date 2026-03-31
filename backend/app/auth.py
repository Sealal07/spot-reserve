import collections
if not hasattr(collections, 'Mapping'):
    import collections.abc
    collections.Mapping = collections.abc.Mapping
if not hasattr(collections, 'Iterable'):
    import collections.abc
    collections.Iterable = collections.abc.Iterable

from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from .models import User
from .engine import   get_db
from .config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES


pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

def verify_password(plain_password, hashed_password):
    '''Верификация пароля'''
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    '''Получение зашифрованного пароля'''
    return pwd_context.hash(password)

def create_access_token(data: dict):
    '''Создание токена доступа'''
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({'exp': expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# auth.py

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
        headers={'WWW-Authenticate': 'Bearer'},
    )
    try:
        pay_load = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = pay_load.get('sub')
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # Ищем пользователя в базе по email, который мы достали из sub
    from .models import User  # Импорт внутри, чтобы избежать circular import
    user = db.query(User).filter(User.email == email).first()

    if user is None:
        raise credentials_exception
    return user