from fastapi import FastAPI
from app.api.routes.health import router as health_router

app = FastAPI(
    title="Fix-My-Ride API",
    description="Backend API for the Fix-My-Ride Motorcycle Service Management System.",
    version="0.1.0",
)

app.include_router(health_router)


@app.get("/")
def read_root():
    """Return a basic welcome message and API status."""
    return {
        "message": "Welcome to Fix-My-Ride API",
        "status": "running",
    }
