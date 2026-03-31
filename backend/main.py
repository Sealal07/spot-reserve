from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app import bookings, profile, routes, spot_api
from app.engine import create_tables

# Создаем таблицы при запуске
# create_tables()

app = FastAPI(title='Spot Reserve API', redirect_slashes=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)
# порядок подключения имеет значение
app.include_router(profile.router)
app.include_router(spot_api.router)
app.include_router(routes.router)
app.include_router(bookings.router)

