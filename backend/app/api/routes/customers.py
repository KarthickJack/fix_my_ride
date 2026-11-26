from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.customer import CustomerCreate, CustomerResponse
from app.services.customer_service import (
    create_customer,
    get_customer_by_id,
    get_customers,
)

router = APIRouter()


@router.post(
    "/",
    response_model=CustomerResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a customer",
    description=(
        "Create a new customer record in PostgreSQL. "
        "Returns 201 Created on success, 409 Conflict if the phone number or "
        "email already exists, and 422 Unprocessable Entity on invalid input."
    ),
    responses={
        409: {
            "description": "A customer with this phone number or email already exists."
        }
    },
)
def create_customer_endpoint(
    customer_data: CustomerCreate,
    db: Session = Depends(get_db),
):
    """Create a new customer using validated input and the service layer."""
    try:
        return create_customer(db=db, customer_data=customer_data)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc


@router.get(
    "/",
    response_model=list[CustomerResponse],
    status_code=status.HTTP_200_OK,
    summary="Retrieve all customers",
    description=(
        "Retrieve all customer records ordered ascending by customer ID. "
        "Returns an empty list if no customers exist."
    ),
)
def list_customers_endpoint(db: Session = Depends(get_db)):
    """Return all customer records from the service layer."""
    return get_customers(db=db)


@router.get(
    "/{customer_id}",
    response_model=CustomerResponse,
    status_code=status.HTTP_200_OK,
    summary="Retrieve a customer by ID",
    description=(
        "Retrieve a single customer record by integer ID. "
        "Returns 404 Not Found when the customer does not exist."
    ),
    responses={404: {"description": "Customer not found."}},
)
def get_customer_endpoint(
    customer_id: int,
    db: Session = Depends(get_db),
):
    """Return one customer by ID or raise 404 if not found."""
    customer = get_customer_by_id(db=db, customer_id=customer_id)
    if customer is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Customer not found",
        )
    return customer
