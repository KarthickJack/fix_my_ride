from fastapi import APIRouter

router = APIRouter(tags=["Health"])


@router.get("/health")
def health_check():
    """Return basic application health status."""
    return {
        "status": "healthy",
        "application": "Fix-My-Ride API",
        "message": "Backend is running successfully",
    }
