from fastapi import APIRouter, HTTPException

from pydantic import BaseModel

from app.database import SessionLocal

from app.models import User

from app.auth.security import (

    hash_password,

    verify_password,

    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# -----------------------------------
# REQUEST MODELS
# -----------------------------------

class RegisterRequest(BaseModel):

    email: str

    password: str


class LoginRequest(BaseModel):

    email: str

    password: str


# -----------------------------------
# REGISTER
# -----------------------------------

@router.post("/register")
def register_user(

    request: RegisterRequest

):

    db = SessionLocal()

    try:

        # Check existing user
        existing_user = (

            db.query(User)

            .filter(
                User.email == request.email
            )

            .first()
        )

        if existing_user:

            raise HTTPException(

                status_code=400,

                detail="Email already registered"
            )

        # Hash password
        hashed_password = (
            hash_password(
                request.password
            )
        )

        # Create user
        user = User(

            email=request.email,

            password_hash=hashed_password
        )

        db.add(user)

        db.commit()

        db.refresh(user)

        return {

            "message":
                "User registered successfully"
        }

    finally:

        db.close()


# -----------------------------------
# LOGIN
# -----------------------------------

@router.post("/login")
def login_user(

    request: LoginRequest

):

    db = SessionLocal()

    try:

        user = (

            db.query(User)

            .filter(
                User.email == request.email
            )

            .first()
        )

        # Invalid email
        if not user:

            raise HTTPException(

                status_code=401,

                detail="Invalid email or password"
            )

        # Verify password
        valid_password = (

            verify_password(

                request.password,

                user.password_hash
            )
        )

        if not valid_password:

            raise HTTPException(

                status_code=401,

                detail="Invalid email or password"
            )

        # Create JWT token
        access_token = (

            create_access_token(

                data={

                    "sub": user.email
                }
            )
        )

        return {

            "access_token":
                access_token,

            "token_type":
                "bearer",

            "user": {

                "id":
                    user.id,

                "email":
                    user.email,

                "role":
                    user.role
            }
        }

    finally:

        db.close()