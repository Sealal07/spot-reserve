from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import bookings, profile, routes, spot_api

app = FastAPI(title='Spot Reserve API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(bookings.router)
app.include_router(spot_api.router)
app.include_router(routes.router)
app.include_router(profile.router)
