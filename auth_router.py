# auth_router.py
from fastapi import APIRouter, HTTPException, Depends, Body
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
import bcrypt
import uuid
from firebase import get_db_root

router = APIRouter()

# Pydantic models
class SignupSchema(BaseModel):
    full_name: str
    username: str
    email: EmailStr
    password: str

class LoginSchema(BaseModel):
    identifier: str  # username or email
    password: str

class UserResponse(BaseModel):
    id: str
    full_name: str
    username: str
    email: str

class FavoriteRequest(BaseModel):
    item_id: str
    item_data: Dict[str, Any]

# Helpers
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())

def find_user_by_username_or_email(identifier: str):
    """
    Searches users by username OR email.
    Returns (user_id, user_data) if found else (None, None)
    """
    users_ref = get_db_root().child("users")
    all_users = users_ref.get() or {}

    for uid, udata in all_users.items():
        if not udata:
            continue
        if udata.get("username") == identifier or udata.get("email") == identifier:
            return uid, udata
    return None, None

@router.post("/signup", response_model=UserResponse)
def signup(payload: SignupSchema):
    users_ref = get_db_root().child("users")

    # Check unique username/email
    all_users = users_ref.get() or {}
    for _, u in all_users.items():
        if not u:
            continue
        if u.get("username") == payload.username:
            raise HTTPException(status_code=400, detail="Username already taken")
        if u.get("email") == payload.email:
            raise HTTPException(status_code=400, detail="Email already registered")

    user_id = str(uuid.uuid4())
    hashed = hash_password(payload.password)

    user_data = {
        "id": user_id,
        "full_name": payload.full_name,
        "username": payload.username,
        "email": payload.email,
        "password": hashed
    }

    users_ref.child(user_id).set(user_data)

    return {
        "id": user_id,
        "full_name": payload.full_name,
        "username": payload.username,
        "email": payload.email
    }

@router.post("/login")
def login(payload: LoginSchema):
    uid, user_data = find_user_by_username_or_email(payload.identifier)
    if not uid:
        raise HTTPException(status_code=401, detail="User not found")

    if not verify_password(payload.password, user_data.get("password", "")):
        raise HTTPException(status_code=401, detail="Invalid password")

    # For simplicity we return user info. In production return JWT token.
    safe_user = {
        "id": user_data.get("id"),
        "full_name": user_data.get("full_name"),
        "username": user_data.get("username"),
        "email": user_data.get("email"),
    }

    return {"message": "Login successful", "user": safe_user}

# Favorites endpoints
@router.post("/favorites/{user_id}")
async def add_favorite(user_id: str, request_data: Dict[str, Any] = Body(...)):
    """
    Add an item to user's favorites
    """
    try:
        item_id = request_data.get("item_id")
        item_data = request_data.get("item_data")
        
        if not item_id or not item_data:
            raise HTTPException(status_code=400, detail="Missing item_id or item_data")
        
        favorites_ref = get_db_root().child("favorites").child(user_id)
        
        # Add or update the favorite item
        favorites_ref.child(str(item_id)).set(item_data)
        
        return {"message": "Added to favorites", "item_id": item_id}
    except Exception as e:
        print(f"Error adding favorite: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/favorites/{user_id}")
def get_favorites(user_id: str):
    """
    Get all favorites for a user
    """
    favorites_ref = get_db_root().child("favorites").child(user_id)
    favorites_data = favorites_ref.get() or {}
    
    # Convert to list
    favorites_list = list(favorites_data.values()) if favorites_data else []
    
    return {"favorites": favorites_list}

@router.delete("/favorites/{user_id}/{item_id}")
def remove_favorite(user_id: str, item_id: str):
    """
    Remove an item from user's favorites
    """
    favorites_ref = get_db_root().child("favorites").child(user_id).child(item_id)
    favorites_ref.delete()
    
    return {"message": "Removed from favorites", "item_id": item_id}
