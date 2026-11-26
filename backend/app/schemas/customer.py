from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field

FULL_NAME_MAX_LENGTH = 150
PHONE_NUMBER_MAX_LENGTH = 20
EMAIL_MAX_LENGTH = 255


class CustomerBase(BaseModel):
    """Shared Pydantic schema containing common customer fields."""

    full_name: str = Field(..., max_length=FULL_NAME_MAX_LENGTH)
    phone_number: str = Field(..., max_length=PHONE_NUMBER_MAX_LENGTH)
    email: Optional[EmailStr] = Field(default=None, max_length=EMAIL_MAX_LENGTH)
    address: Optional[str] = None


class CustomerCreate(CustomerBase):
    """Schema for incoming data when creating a new customer."""

    pass


class CustomerUpdate(BaseModel):
    """Schema for partial customer updates where every editable field is optional."""

    full_name: Optional[str] = Field(default=None, max_length=FULL_NAME_MAX_LENGTH)
    phone_number: Optional[str] = Field(
        default=None, max_length=PHONE_NUMBER_MAX_LENGTH
    )
    email: Optional[EmailStr] = Field(default=None, max_length=EMAIL_MAX_LENGTH)
    address: Optional[str] = None


class CustomerResponse(CustomerBase):
    """Schema representing customer data returned by API responses."""

    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
