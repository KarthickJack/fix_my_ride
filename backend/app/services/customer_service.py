from typing import Optional

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Session

from app.db.models.customer import Customer
from app.schemas.customer import CustomerCreate


def create_customer(db: Session, customer_data: CustomerCreate) -> Customer:
    """Create and persist a new Customer record in PostgreSQL."""
    customer = Customer(**customer_data.model_dump())
    db.add(customer)

    try:
        db.commit()
        db.refresh(customer)
        return customer
    except IntegrityError as exc:
        db.rollback()
        error_detail = str(exc.orig).lower() if exc.orig else ""
        if "phone_number" in error_detail:
            raise ValueError(
                "A customer with this phone number already exists."
            ) from exc
        if "email" in error_detail:
            raise ValueError(
                "A customer with this email already exists."
            ) from exc
        raise
    except SQLAlchemyError:
        db.rollback()
        raise


def get_customer_by_id(db: Session, customer_id: int) -> Optional[Customer]:
    """Retrieve a single Customer by primary key ID, or None if not found."""
    statement = select(Customer).where(Customer.id == customer_id)
    return db.scalar(statement)


def get_customer_by_phone(
    db: Session, phone_number: str
) -> Optional[Customer]:
    """Retrieve a single Customer by phone number, or None if not found."""
    statement = select(Customer).where(Customer.phone_number == phone_number)
    return db.scalar(statement)


def get_customers(db: Session) -> list[Customer]:
    """Retrieve all Customer records ordered ascending by ID."""
    statement = select(Customer).order_by(Customer.id.asc())
    return list(db.scalars(statement).all())
