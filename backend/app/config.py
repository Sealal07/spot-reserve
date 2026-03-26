import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY') or "super_secret_key"
ALGORITHM = os.getenv('ALGORITHM') or "HS256"
raw_expire = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')

if raw_expire is not None:
    ACCESS_TOKEN_EXPIRE_MINUTES = int(raw_expire)
else:
    ACCESS_TOKEN_EXPIRE_MINUTES = 30