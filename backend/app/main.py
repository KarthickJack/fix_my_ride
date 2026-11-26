from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes.customers import router as customers_router
from app.api.routes.health import router as health_router
from app.core.config import settings

app = FastAPI(
    title="Fix-My-Ride API",
    description="Backend API for the Fix-My-Ride Motorcycle Service Management System.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(customers_router, prefix="/api/customers", tags=["Customers"])


@app.get("/")
def read_root():
    """Return a basic welcome message and API status."""
    return {
        "message": "Welcome to Fix-My-Ride API",
        "status": "running",
    }
